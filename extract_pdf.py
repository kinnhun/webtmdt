import fitz
import sys
import os
import glob

# Find the PDF file
pdf_files = glob.glob(os.path.join(r'd:\nemark\web thuong mai dien tu\webtmdt', '*.pdf'))
print(f'Found PDF files: {pdf_files}', flush=True)

if not pdf_files:
    print('No PDF files found!', flush=True)
    sys.exit(1)

pdf_path = pdf_files[0]
print(f'Opening: {pdf_path}', flush=True)

try:
    doc = fitz.open(pdf_path)
    print(f'Total pages: {doc.page_count}', flush=True)
    
    output_path = os.path.join(r'd:\nemark\web thuong mai dien tu\webtmdt', 'pdf_content.txt')
    with open(output_path, 'w', encoding='utf-8') as f:
        for i in range(doc.page_count):
            page = doc[i]
            text = page.get_text()
            f.write(f'=== PAGE {i+1} ===\n')
            f.write(text)
            f.write('\n\n')
            print(f'Page {i+1} done', flush=True)
    
    doc.close()
    print(f'Done! Output saved to: {output_path}', flush=True)
except Exception as e:
    print(f'Error: {e}', flush=True)
    sys.exit(1)
