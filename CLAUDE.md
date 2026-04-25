# สารบัญจัดเก็บไฟล์ — Project Link Directory

## บทบาทของเจ้าของโปรเจกต์
สร้างและดูแลเว็บสำหรับรวบรวม link ของงานโปรแกรมทั้งหมด ให้ผู้เกี่ยวข้องเข้าถึงได้สะดวกผ่าน QR Code หรือ Add to Home Screen บน iPhone

## ไฟล์หลัก
- `สรุปงาน.html` — หน้าเดียว ไม่มี framework ใช้ Vanilla HTML/CSS/JS
- `manifest.json` — PWA manifest สำหรับ Add to Home Screen
- `sw.js` — Service Worker สำหรับ cache offline
- `ภาพ/` — รูปภาพ background header

## โครงสร้างหน้า
iOS-style card list แต่ละการ์ดแตะได้เพื่อเปิด bottom sheet modal ที่มี QR Code และปุ่มเปิดเว็บไซต์

## รายการโปรเจกต์ปัจจุบัน

| # | ชื่อ | สถานะ | URL |
|---|------|--------|-----|
| 1 | KPI Dashboard PCD ปี 2569 | กำลังดำเนินงาน | mea-kpi-dashboard69.techstatcore.com |
| 2 | ติดตามงาน กสฟ. | กำลังดำเนินงาน | mea-followup69.techstatcore.com |
| 3 | สมุดบันทึก ศูนย์รักษาความปลอดภัยสถานีไฟฟ้า | ทดลองการใช้งาน / เก็บ Feedback | mea-notebook-securitycenter.techstatcore.com |
| 4 | Line Chatbot แจ้งสถานะช่างไฟฟ้า | รอหน่วยงาน ฝมธ. ตรวจสอบระบบ | — |
| 5 | เว็บกองสถานีไฟฟ้า | กำลังดำเนินงาน | — |

## ระบบ Badge สี
| Class | สี | ความหมาย |
|-------|----|-----------|
| `badge-yellow` | เหลือง | กำลังดำเนินงาน |
| `badge-green` | เขียว | เสร็จสมบูรณ์ |
| `badge-blue` | ฟ้าอ่อน | ทดลองการใช้งาน / เก็บ Feedback |
| `badge-purple` | ม่วงอ่อน | รอหน่วยงานภายนอกตรวจสอบ |

## PWA / Add to Home Screen
เปิดใน Safari → Share → Add to Home Screen → เปิดแบบ fullscreen ไม่มี browser bar  
Service worker ใช้ cache-first strategy — ต้องใช้งาน HTTPS จึงจะทำงานเต็มรูปแบบ

## แนวทางแก้ไข
- เพิ่มโปรเจกต์ใหม่: copy Card block + Modal block แล้วเปลี่ยนเลข id และข้อมูล
- การ์ดที่ยังไม่มี link: ใช้ `class="card card-nolink"` และไม่ใส่ `onclick`
- เปลี่ยนสถานะ: เปลี่ยน badge class ใน card และใน modal ให้ตรงกัน
