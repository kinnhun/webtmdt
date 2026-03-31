import fitz
import os
import glob

pdf_files = glob.glob(os.path.join(r'd:\nemark\web thuong mai dien tu\webtmdt', '*.pdf'))
pdf_path = pdf_files[0]

output_dir = os.path.join(r'd:\nemark\web thuong mai dien tu\webtmdt', 'pdf_images')
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

for i in range(doc.page_count):
    page = doc[i]
    # Save page as image
    pix = page.get_pixmap(dpi=150)
    img_path = os.path.join(output_dir, f'page_{i+1}.png')
    pix.save(img_path)
    print(f'Saved page {i+1} as image', flush=True)

doc.close()
print('Done!', flush=True)
