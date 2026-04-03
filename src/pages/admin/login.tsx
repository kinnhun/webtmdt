import React, { useState } from 'react';
import { Form, Input, Button, message, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';

const { Title, Text } = Typography;

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (res.ok) {
        message.success(data.message || 'Đăng nhập thành công!');
        router.push('/admin');
      } else {
        message.error(data.error || 'Lỗi đăng nhập');
      }
    } catch (err: any) {
      console.error(err);
      message.error('Đã xảy ra lỗi hệ thống!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - B2B Ecommerce</title>
      </Head>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Left Side: Brand/Image */}
        <div className="hidden lg:flex w-1/2 bg-navy-deep relative overflow-hidden flex-col items-center justify-center p-12">
          {/* Decorative background circles */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-navy blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center text-white max-w-lg">
             <div className="mb-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl inline-flex flex-col items-center justify-center border border-white/20 shadow-xl">
               <Image src="/img/logo-no-text.png" alt="DHT Logo" width={60} height={60} className="mb-3" />
               <div className="text-4xl font-display font-bold tracking-tighter" style={{
                 background: "linear-gradient(180deg, #f5d76e 0%, #e8a838 50%, #d4862a 100%)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
                 backgroundClip: "text",
               }}>DHT</div>
             </div>
             <h1 className="text-4xl font-display font-medium mb-4">Enterprise Management</h1>
             <p className="text-lg text-white/80 font-body font-light leading-relaxed">
               Secure portal for managing your B2B commerce operations, product catalogs, and leads.
             </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white/60 backdrop-blur-sm shadow-2xl relative z-10">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="lg:hidden mb-6 inline-flex items-center gap-2 bg-navy-deep text-white p-3 px-5 rounded-xl shadow-lg border border-white/10">
                <Image src="/img/logo-no-text.png" alt="DHT Logo" width={28} height={28} />
                <span className="font-display text-2xl font-bold tracking-tighter" style={{
                  background: "linear-gradient(180deg, #f5d76e 0%, #e8a838 50%, #d4862a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>DHT</span>
              </div>
              <Title level={2} className="font-display m-0 text-navy-deep" style={{ margin: 0 }}>Welcome Back</Title>
              <Text type="secondary" className="font-body text-base">Please enter your admin credentials</Text>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <Form
                name="admin_login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size="large"
              >
                <Form.Item
                  name="username"
                  label={<span className="font-medium text-gray-700">Username</span>}
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input 
                    prefix={<UserOutlined className="text-gray-400" />} 
                    placeholder="admin" 
                    className="rounded-lg h-12"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={<span className="font-medium text-gray-700">Password</span>}
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="••••••••"
                    className="rounded-lg h-12"
                  />
                </Form.Item>

                <div className="flex justify-between items-center mb-6">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-gray-600">Remember me</Checkbox>
                  </Form.Item>
                  <a className="text-orange font-medium hover:text-orange/80 transition-colors" href="#">
                    Forgot password?
                  </a>
                </div>

                <Form.Item className="m-0">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="w-full h-12 bg-navy-deep hover:bg-navy text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all border-none"
                    loading={loading}
                  >
                    Sign In to Portal
                  </Button>
                </Form.Item>
              </Form>
            </div>
            
            <div className="text-center mt-8 text-sm text-gray-500 font-body">
              Protected by Enterprise Security Policies.<br/>
              &copy; {new Date().getFullYear()} DHT Administrator Portal. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
