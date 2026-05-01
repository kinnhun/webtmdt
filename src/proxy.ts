import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Detect country from common headers (Vercel, Cloudflare, Cloudfront, Next.js geo)
  let country = 
    request.geo?.country ||
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('cloudfront-viewer-country');

  let shouldSetCookie = false;

  // 2. Fallback: Nếu không có header (ví dụ chạy trên VPS thường), thử lấy từ Cookie đã lưu
  if (!country) {
    const cachedCountry = request.cookies.get('cached_country')?.value;
    if (cachedCountry) {
      country = cachedCountry;
    } else {
      // 3. Nếu chưa có Cookie, lấy IP và gọi API miễn phí để kiểm tra quốc gia
      const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip');
      if (ip && ip !== '127.0.0.1' && ip !== '::1') {
        try {
          const res = await fetch(`https://api.country.is/${ip.trim()}`, { cache: 'no-store' });
          if (res.ok) {
            const data = await res.json();
            if (data.country) {
              country = data.country;
              shouldSetCookie = true;
            }
          }
        } catch (e) {
          console.error("Lỗi khi tra cứu IP:", e);
        }
      }
    }
  }

  // Tính năng dành cho môi trường dev (localhost) để test việc chặn IP
  // Bạn có thể thêm ?testCountry=VN vào URL để thử nghiệm
  if (process.env.NODE_ENV === 'development') {
    const forcedCountry = request.nextUrl.searchParams.get('testCountry') || request.headers.get('x-test-country');
    if (forcedCountry) {
      country = forcedCountry.toUpperCase();
      shouldSetCookie = false; // Không lưu cookie khi đang test
    }
  }

  // Hàm tiện ích để gắn cookie vào response nếu cần
  const attachCookie = (res: NextResponse) => {
    if (shouldSetCookie && country) {
      // Lưu cookie trong 24 giờ để không phải gọi API lại cho mỗi request
      res.cookies.set('cached_country', country, { maxAge: 60 * 60 * 24, path: '/' });
    }
    return res;
  };

  // Block traffic from Vietnam (VN)
  if (country === 'VN') {
    // If it's an API route, return JSON so it doesn't break fetch requests
    if (pathname.startsWith('/api/')) {
      return attachCookie(NextResponse.json({ error: 'Access Denied: Region Blocked' }, { status: 403 }));
    }

    return attachCookie(new NextResponse(
      `<!DOCTYPE html>
<html>
<head>
  <title>Access Denied</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 50px; background-color: #f8f9fa; color: #333; }
    h1 { font-size: 2em; margin-bottom: 20px; }
    p { font-size: 1.2em; color: #666; }
  </style>
</head>
<body>
  <h1>Access Denied</h1>
  <p>Sorry, this website is not available in your region.</p>
</body>
</html>`,
      { 
        status: 403,
        headers: { 'content-type': 'text/html' }
      }
    ));
  }

  const token = request.cookies.get('admin_token')?.value;

  // Protect /api/admin routes, except auth endpoints
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth/login')) {
    if (!token) {
      return attachCookie(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }));
    }
  }

  // Protect /admin routes, but not /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return attachCookie(NextResponse.redirect(loginUrl));
    }
  }
  
  // If user has token and goes to /admin/login, redirect to /admin
  if (pathname.startsWith('/admin/login') && token) {
    return attachCookie(NextResponse.redirect(new URL('/admin', request.url)));
  }

  return attachCookie(NextResponse.next());
}

// Ensure proxy runs on all paths to apply geo-blocking globally
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
