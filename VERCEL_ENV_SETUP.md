# 🚀 Hướng Dẫn Add Environment Variables Trên Vercel (Chi Tiết từng Bước)

## Phần 1: Chuẩn Bị Credentials (Lấy 4 Giá Trị)

### 1️⃣ Lấy `FB_APP_SECRET`
1. Vào https://developers.facebook.com/apps/1388459879837006/settings/basic
2. Tìm dòng "App Secret" → Click **Show**
3. Điền password Facebook nếu được yêu cầu
4. **Copy** giá trị (bắt đầu bằng `f0123...` hoặc tương tự)

**Kết quả:** Bạn có `FB_APP_SECRET=abc123xyz...`

---

### 2️⃣ Lấy `FB_PAGE_ACCESS_TOKEN`
1. Vào https://developers.facebook.com/tools/explorer
2. Tại **"Graph API Explorer"** (góc trái):
   - Dropdown "Select an app" → Chọn app `1388459879837006`
   - Dropdown "Select an object" → Chọn **Page** (không phải User)
3. Button **Generate Access Token** → Click
4. Copy token dài (bắt đầu bằng `EAAB...`)

**Kết quả:** Bạn có `FB_PAGE_ACCESS_TOKEN=EAABsb123...`

---

### 3️⃣ Tạo `FB_WEBHOOK_VERIFY_TOKEN` (Tự Tạo)

Mở Terminal / CMD và chạy lệnh này (paste toàn bộ):

**macOS / Linux:**
```bash
openssl rand -hex 16
```

**Windows (CMD):**
```cmd
python -c "import secrets; print(secrets.token_hex(16))"
```

Hoặc **gõ tay** string ngẫu nhiên (ví dụ): `my_secret_webhook_token_2026`

**Kết quả:** Bạn có `FB_WEBHOOK_VERIFY_TOKEN=abc123def456...`

---

### 4️⃣ Lấy `AI_GATEWAY_API_KEY`
1. Vào https://vercel.com/~/ai/api-keys
2. Click **Create New Token** (button xanh)
3. Đặt tên: `socialai-chatbot`
4. Copy token (dài ~100 ký tự)

**Kết quả:** Bạn có `AI_GATEWAY_API_KEY=xxx_yyy_zzz...`

---

## Phần 2: Deploy Code Lên Vercel

### Bước 1: Push Code
```bash
cd /path/to/project
git add .
git commit -m "SocialAI Dashboard - Chatbot Module"
git push origin main
```

### Bước 2: Connect to Vercel
1. Vào https://vercel.com/new
2. Click **Import Git Repository**
3. Chọn repo `sociala-devv0`
4. Click **Import** → **Deploy**

⏳ Chờ ~2 phút deploy xong. Vercel sẽ hiện URL như:
```
https://socialai-dashboard-abc.vercel.app
```

**LƯU Ý URL này để dùng ở Phần 4**

---

## Phần 3: Add Environment Variables (Quan Trọng!)

### Cách 1: Qua Vercel Dashboard (Dễ Nhất - Khuyên Dùng)

1. Đăng nhập https://vercel.com → Vào project `sociala-devv0`
2. Click tab **Settings** (ở trên)
3. Click **Environment Variables** (menu trái)
4. Sẽ thấy form như này:

```
[Name]          [Value]
[Development ▼] [Add]
```

### Điền 6 Biến Này (Theo Đúng Thứ Tự):

**Lần 1:**
- Name: `FB_APP_ID`
- Value: `1388459879837006`
- Click **Add**

**Lần 2:**
- Name: `FB_APP_SECRET`
- Value: `[Dán giá trị từ Phần 1️⃣]`
- Click **Add**

**Lần 3:**
- Name: `FB_PAGE_ID`
- Value: `1198955446627869`
- Click **Add**

**Lần 4:**
- Name: `FB_PAGE_ACCESS_TOKEN`
- Value: `[Dán giá trị từ Phần 2️⃣]`
- Click **Add**

**Lần 5:**
- Name: `FB_WEBHOOK_VERIFY_TOKEN`
- Value: `[Dán giá trị từ Phần 3️⃣]`
- Click **Add**

**Lần 6:**
- Name: `AI_GATEWAY_API_KEY`
- Value: `[Dán giá trị từ Phần 4️⃣]`
- Click **Add**

✅ Sau khi thêm 6 cái, nhấn **Save**

---

### Cách 2: Copy-Paste Toàn Bộ (Nhanh Hơn)

Nếu Vercel cho phép, bạn có thể paste `.env` file:

1. Tạo file `.env` local với nội dung:
```
FB_APP_ID=1388459879837006
FB_APP_SECRET=abc123xyz...
FB_PAGE_ID=1198955446627869
FB_PAGE_ACCESS_TOKEN=EAABsb123...
FB_WEBHOOK_VERIFY_TOKEN=my_secret_token
AI_GATEWAY_API_KEY=xxx_yyy_zzz...
```

2. Vercel Dashboard → Settings → Environment Variables
3. Copy-paste nội dung file `.env`

---

## Phần 4: Redeploy & Test

### Bước 1: Trigger Redeploy
1. Sau khi add xong Environment Variables → Click **Save**
2. Vào tab **Deployments**
3. Tìm deployment mới nhất → Click **...** → **Redeploy**
4. Chọn **Redeploy** (lại)

⏳ Chờ ~1-2 phút

Khi xong sẽ hiện **✓ Ready** (xanh)

---

### Bước 2: Kiểm Tra URL
Vào https://your-app-name.vercel.app (ví dụ: https://socialai-abc.vercel.app)

Nếu thấy Dashboard với:
- ✅ Sidebar (Tổng Quan, CSKH, Lịch Đăng)
- ✅ Stats cards
- ✅ Không có lỗi đỏ

→ **Tuyệt vời! Code đã chạy!**

---

## Phần 5: Kết Nối Webhook Facebook (Bước Quan Trọng!)

**Bây giờ Facebook phải biết gửi tin nhắn đến URL của bạn**

### Bước 1: Xác Thực Webhook
1. Vào https://developers.facebook.com/apps/1388459879837006/messenger/webhooks
2. Click **Edit Subscription**
3. Điền:
   - **Callback URL**: `https://your-app-name.vercel.app/api/webhook/facebook`
   - **Verify Token**: `[Giá trị FB_WEBHOOK_VERIFY_TOKEN từ Phần 3️⃣]`
4. Click **Verify & Save**

✅ Nếu xanh → Webhook xác thực thành công!

---

### Bước 2: Subscribe Events
Tại cùng page, tìm **"Events"** → Check:
- ☑️ `messages`
- ☑️ `messaging_postbacks`
- ☑️ `message_deliveries` (tùy chọn)

Click **Save**

---

## Phần 6: Test Chatbot

### Bước 1: Mở Fanpage
1. Vào Facebook Page: https://facebook.com/1198955446627869
2. Click **Message** (hoặc comment một bài đăng)
3. Gửi tin: `"Xin chào"`

### Bước 2: Chờ Bot Trả Lời
- ⏳ Chờ 1-2 giây
- ✅ Bot sẽ trả lời tự động (sử dụng Gemini 2.5)

Ví dụ tin bot:
```
Bot: Xin chào! Cảm ơn bạn đã liên hệ. Tôi là bot hỗ trợ khách hàng. Tôi có thể giúp gì cho bạn hôm nay?
```

---

## Phần 7: Debug (Nếu Có Lỗi)

### Lỗi: "Webhook xác thực thất bại"
- ✅ Check URL đúng: `https://your-app-name.vercel.app/api/webhook/facebook`
- ✅ Check Verify Token đúng (khớp với `FB_WEBHOOK_VERIFY_TOKEN`)
- ✅ Deploy đã xong? (Check Vercel Deployments)

### Lỗi: "Bot không trả lời"
- ✅ Check Environment Variables đủ 6 cái
- ✅ Redeploy chưa?
- ✅ AI_GATEWAY_API_KEY hợp lệ chưa? (Test tại https://vercel.com/~/ai/api-keys)

### Lỗi: "Error 500" trên Vercel logs
- ✅ Vào Settings → Functions → Logs
- ✅ Xem lỗi chi tiết
- ✅ Gửi cho tôi lỗi đó

---

## 🎉 Xong!

Bây giờ bạn đã có:
- ✅ Dashboard chạy trên Vercel (HTTPS)
- ✅ Chatbot tự động trả lời (Gemini 2.5)
- ✅ Webhook kết nối Facebook

**Tiếp Theo (Tùy Chọn):**
- Module Lịch Đăng Bài (scheduler)
- Lưu trữ lịch sử chat (database)
- Phân tích thống kê

Có vấn đề gì không? Hãy cho tôi biết!
