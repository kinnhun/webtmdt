import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Detect country from common headers (Vercel, Cloudflare, Cloudfront, Next.js geo)
  let country = 
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('cloudfront-viewer-country');

  let shouldSetCookie = false;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip')?.trim();

  // 2. Fallback: Nếu không có header (ví dụ chạy trên VPS thường), thử lấy từ Cookie đã lưu
  if (!country) {
    const cachedCountry = request.cookies.get('cached_country')?.value;
    // Kiểm tra xem cookie có chứa IP hiện tại không
    if (cachedCountry && ip && cachedCountry.startsWith(`${ip}|`)) {
      country = cachedCountry.split('|')[1];
    } else {
      // 3. Nếu chưa có Cookie hoặc IP đã thay đổi, lấy IP và gọi API miễn phí để kiểm tra quốc gia
      if (ip && ip !== '127.0.0.1' && ip !== '::1') {
        try {
          const res = await fetch(`https://api.country.is/${ip}`, { cache: 'no-store' });
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

  // Tính năng test việc chặn IP (có thể dùng trên production)
  const forcedCountry = request.nextUrl.searchParams.get('testCountry') || request.headers.get('x-test-country');
  if (forcedCountry) {
    country = forcedCountry.toUpperCase();
    shouldSetCookie = false; // Không lưu cookie khi đang test
  }

  console.log("PROXY DEBUG - URL:", pathname, "IP:", request.headers.get('x-forwarded-for'), "Country:", country);

  // Hàm tiện ích để gắn cookie vào response nếu cần
  const attachCookie = (res: NextResponse) => {
    if (shouldSetCookie && country && ip) {
      // Lưu cookie trong 24 giờ bao gồm IP để khi đổi mạng (VPN) sẽ check lại
      res.cookies.set('cached_country', `${ip}|${country}`, { maxAge: 60 * 60 * 24, path: '/' });
    }
    return res;
  };

  // Block traffic from Vietnam (VN)
  if (country && country === 'VN') {
    // If it's an API route, return JSON so it doesn't break fetch requests
    if (pathname.startsWith('/api/')) {
      return attachCookie(NextResponse.json({ error: 'Access Denied: Region Blocked' }, { status: 403 }));
    }

    return attachCookie(new NextResponse(
      `<html><body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:#fff;font-family:sans-serif;"><h1>ACCESS DENIED: NOT AVAILABLE IN YOUR REGION.</h1></body></html>`,
      { 
        status: 403,
        headers: { 
          'content-type': 'text/html',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store'
        }
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
    '/',
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
