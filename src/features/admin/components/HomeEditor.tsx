import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Card, Typography, Spin, Tabs, Radio, Upload } from 'antd';
import { SaveOutlined, VideoCameraOutlined, TranslationOutlined, UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function HomeEditor() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [translatingLang, setTranslatingLang] = useState<string | null>(null);
  const [videoType, setVideoType] = useState<'youtube' | 'upload'>('youtube');

  const handleTranslate = async (sourceLang: 'vi' | 'us' | 'uk') => {
    const title1 = form.getFieldValue(['factoryVideoTitle1', sourceLang]) || '';
    const title2 = form.getFieldValue(['factoryVideoTitle2', sourceLang]) || '';
    const desc = form.getFieldValue(['factoryVideoDescription', sourceLang]) || '';

    if (!title1 && !title2 && !desc) {
      message.warning(`Vui lòng nhập nội dung ở tab ${sourceLang.toUpperCase()} trước.`);
      return;
    }

    setTranslatingLang(sourceLang);
    try {
      const callTranslateAPI = async (text: string, target: string, source: string) => {
        if (!text) return '';
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLang: target, sourceLang: source }),
        });
        const data = await res.json();
        return data.translated || text;
      };

      if (sourceLang === 'vi') {
        const [enTitle1, enTitle2, enDesc] = await Promise.all([
          callTranslateAPI(title1, 'en', 'vi'),
          callTranslateAPI(title2, 'en', 'vi'),
          callTranslateAPI(desc, 'en', 'vi')
        ]);
        form.setFieldValue(['factoryVideoTitle1', 'us'], enTitle1);
        form.setFieldValue(['factoryVideoTitle2', 'us'], enTitle2);
        form.setFieldValue(['factoryVideoDescription', 'us'], enDesc);
        form.setFieldValue(['factoryVideoTitle1', 'uk'], enTitle1);
        form.setFieldValue(['factoryVideoTitle2', 'uk'], enTitle2);
        form.setFieldValue(['factoryVideoDescription', 'uk'], enDesc);
      } else {
        const otherEn = sourceLang === 'us' ? 'uk' : 'us';
        form.setFieldValue(['factoryVideoTitle1', otherEn], title1);
        form.setFieldValue(['factoryVideoTitle2', otherEn], title2);
        form.setFieldValue(['factoryVideoDescription', otherEn], desc);

        const [viTitle1, viTitle2, viDesc] = await Promise.all([
          callTranslateAPI(title1, 'vi', 'en'),
          callTranslateAPI(title2, 'vi', 'en'),
          callTranslateAPI(desc, 'vi', 'en')
        ]);
        form.setFieldValue(['factoryVideoTitle1', 'vi'], viTitle1);
        form.setFieldValue(['factoryVideoTitle2', 'vi'], viTitle2);
        form.setFieldValue(['factoryVideoDescription', 'vi'], viDesc);
      }

      message.success('Dịch thành công!');
    } catch (err) {
      console.error('Translation error:', err);
      message.error('Lỗi khi dịch.');
    } finally {
      setTranslatingLang(null);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/home');
        const json = await res.json();
        if (json.success && json.data) {
          form.setFieldsValue(json.data);
          if (json.data.factoryVideoUrl && !json.data.factoryVideoUrl.includes('youtube') && !json.data.factoryVideoUrl.includes('youtu.be')) {
            setVideoType('upload');
          } else {
            setVideoType('youtube');
          }
        }
      } catch (err) {
        console.error('Failed to load home content:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const res = await fetch('/api/admin/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json.success) {
        message.success('Cập nhật trang chủ thành công!');
      } else {
        message.error(json.error || 'Cập nhật thất bại');
      }
    } catch (err) {
      console.error('Save error:', err);
      message.error('Lỗi khi lưu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title level={3} className="m-0 text-navy-deep">Home Page Settings</Title>
          <Text className="text-gray-500">Quản lý các nội dung hiển thị trên trang chủ</Text>
        </div>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={saving}
          className="bg-orange-600 hover:bg-orange-500 border-none shadow-md h-10 px-6 font-medium rounded-lg"
        >
          Lưu thay đổi
        </Button>
      </div>

      <Card title={<div className="flex items-center gap-2"><VideoCameraOutlined className="text-orange-500" /><span>Factory Video Section</span></div>} className="shadow-sm rounded-xl border-gray-100 overflow-hidden">
        <Form form={form} layout="vertical">
          <div className="mb-4">
            <Radio.Group value={videoType} onChange={(e) => setVideoType(e.target.value)} className="mb-6">
              <Radio.Button value="youtube">Link YouTube</Radio.Button>
              <Radio.Button value="upload">Tải file Video</Radio.Button>
            </Radio.Group>

            {videoType === 'youtube' ? (
              <Form.Item
                name="factoryVideoUrl"
                label={<span className="font-semibold text-gray-700">YouTube Video URL</span>}
                extra="Nhập đường link video YouTube (ví dụ: https://www.youtube.com/watch?v=...)"
              >
                <Input placeholder="https://www.youtube.com/watch?v=..." size="large" className="rounded-lg" />
              </Form.Item>
            ) : (
              <Form.Item
                name="factoryVideoUrl"
                label={<span className="font-semibold text-gray-700">Video File</span>}
                extra="Tải lên file video (.mp4). Dung lượng không giới hạn. Video sẽ lưu trữ trực tiếp trên máy chủ."
              >
                <Upload
                  accept="video/*"
                  maxCount={1}
                  showUploadList={false}
                  customRequest={async ({ file, onSuccess, onError, onProgress }) => {
                    try {
                      const f = file as File;
                      const ext = f.name.split('.').pop() || 'mp4';
                      const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
                      const totalChunks = Math.ceil(f.size / CHUNK_SIZE);
                      const fileId = Date.now().toString();
                      
                      let finalData = null;

                      for (let i = 0; i < totalChunks; i++) {
                        const start = i * CHUNK_SIZE;
                        const end = Math.min(start + CHUNK_SIZE, f.size);
                        const chunk = f.slice(start, end);
                        
                        const res = await fetch('/api/upload-chunk', {
                          method: 'POST',
                          headers: {
                            'x-file-id': fileId,
                            'x-file-ext': ext,
                            'x-chunk-index': i.toString(),
                            'x-total-chunks': totalChunks.toString(),
                          },
                          body: chunk,
                        });
                        
                        if (!res.ok) {
                          throw new Error(`Chunk ${i} upload failed`);
                        }

                        onProgress?.({ percent: Math.round(((i + 1) / totalChunks) * 100) });
                        
                        if (i === totalChunks - 1) {
                          finalData = await res.json();
                        }
                      }
                      
                      if (finalData && finalData.url) {
                        const oldUrl = form.getFieldValue('factoryVideoUrl');
                        if (oldUrl && oldUrl.startsWith('/api/videos/')) {
                          await fetch('/api/upload-file', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url: oldUrl })
                          }).catch(console.error);
                        } else if (oldUrl && oldUrl.startsWith('/api/images/')) {
                          const oldId = oldUrl.split('/').pop();
                          if (oldId) {
                            await fetch(`/api/images/${oldId}`, { method: 'DELETE' }).catch(console.error);
                          }
                        }

                        form.setFieldValue('factoryVideoUrl', finalData.url);
                        message.success('Tải video thành công!');
                        onSuccess?.(finalData);
                      } else {
                        throw new Error('Upload complete but no URL returned');
                      }
                    } catch (err: any) {
                      message.error(err.message || 'Lỗi khi tải video');
                      onError?.(err);
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />} size="large" className="rounded-lg">Chọn File Video</Button>
                </Upload>

                <Form.Item shouldUpdate={(prev, curr) => prev.factoryVideoUrl !== curr.factoryVideoUrl} className="mb-0 mt-4">
                  {() => {
                    const url = form.getFieldValue('factoryVideoUrl');
                    if (url && !url.includes('youtube') && !url.includes('youtu.be')) {
                      return <video src={url} className="w-64 h-auto rounded-lg shadow-md border border-gray-100" controls />;
                    }
                    return null;
                  }}
                </Form.Item>
              </Form.Item>
            )}
          </div>

          <Tabs defaultActiveKey="vi" type="card" className="mt-8">
            <Tabs.TabPane tab="Tiếng Việt (VI)" key="vi">
              <div className="p-4 bg-gray-50 rounded-b-lg border border-gray-200 border-t-0 space-y-4 relative">
                <div className="absolute top-2 right-4 z-10">
                  <Button
                    size="small"
                    icon={<TranslationOutlined />}
                    loading={translatingLang === 'vi'}
                    onClick={() => handleTranslate('vi')}
                    className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md hover:shadow-sm"
                    style={{ backgroundColor: 'hsl(var(--orange)/0.1)', color: 'hsl(var(--orange))', border: 'none' }}
                  >
                    Translate to US & UK
                  </Button>
                </div>
                <Form.Item name={['factoryVideoTitle1', 'vi']} label="Tiêu đề 1 (Ví dụ: Nghệ thuật)" className="pt-2">
                  <Input placeholder="Nghệ thuật" />
                </Form.Item>
                <Form.Item name={['factoryVideoTitle2', 'vi']} label="Tiêu đề 2 (Ví dụ: Creation)">
                  <Input placeholder="Chế tác." />
                </Form.Item>
                <Form.Item name={['factoryVideoDescription', 'vi']} label="Mô tả">
                  <Input.TextArea rows={4} placeholder="Nhập mô tả..." />
                </Form.Item>
              </div>
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="English (US)" key="us">
              <div className="p-4 bg-gray-50 rounded-b-lg border border-gray-200 border-t-0 space-y-4 relative">
                <div className="absolute top-2 right-4 z-10">
                  <Button
                    size="small"
                    icon={<TranslationOutlined />}
                    loading={translatingLang === 'us'}
                    onClick={() => handleTranslate('us')}
                    className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md hover:shadow-sm"
                    style={{ backgroundColor: 'hsl(var(--orange)/0.1)', color: 'hsl(var(--orange))', border: 'none' }}
                  >
                    Translate to UK & VI
                  </Button>
                </div>
                <Form.Item name={['factoryVideoTitle1', 'us']} label="Title 1 (e.g., The Art of)" className="pt-2">
                  <Input placeholder="The Art of" />
                </Form.Item>
                <Form.Item name={['factoryVideoTitle2', 'us']} label="Title 2 (e.g., Creation)">
                  <Input placeholder="Creation." />
                </Form.Item>
                <Form.Item name={['factoryVideoDescription', 'us']} label="Description">
                  <Input.TextArea rows={4} placeholder="Enter description..." />
                </Form.Item>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="English (UK)" key="uk">
              <div className="p-4 bg-gray-50 rounded-b-lg border border-gray-200 border-t-0 space-y-4 relative">
                <div className="absolute top-2 right-4 z-10">
                  <Button
                    size="small"
                    icon={<TranslationOutlined />}
                    loading={translatingLang === 'uk'}
                    onClick={() => handleTranslate('uk')}
                    className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md hover:shadow-sm"
                    style={{ backgroundColor: 'hsl(var(--orange)/0.1)', color: 'hsl(var(--orange))', border: 'none' }}
                  >
                    Translate to US & VI
                  </Button>
                </div>
                <Form.Item name={['factoryVideoTitle1', 'uk']} label="Title 1 (e.g., The Art of)" className="pt-2">
                  <Input placeholder="The Art of" />
                </Form.Item>
                <Form.Item name={['factoryVideoTitle2', 'uk']} label="Title 2 (e.g., Creation)">
                  <Input placeholder="Creation." />
                </Form.Item>
                <Form.Item name={['factoryVideoDescription', 'uk']} label="Description">
                  <Input.TextArea rows={4} placeholder="Enter description..." />
                </Form.Item>
              </div>
            </Tabs.TabPane>
          </Tabs>

        </Form>
      </Card>
    </div>
  );
}
