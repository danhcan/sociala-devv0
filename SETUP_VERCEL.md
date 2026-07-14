# 🚀 Hướng dẫn Chạy SocialAI Dashboard trên Vercel

## Bước 1: Deploy lên Vercel (2 phút)

### A. Tạo Repository GitHub
```bash
git add .
git commit -m "Initial commit: SocialAI Dashboard with Chatbot & Scheduler"
git push origin main
```

### B. Deploy trên Vercel
1. Vào https://vercel.com > New Project
2. Import repository (chọn repo GitHub của bạn)
3. Nhấn **Deploy**
4. Chờ build hoàn tất (~1-2 phút)
5. Copy URL domain (vd: `https://your-app.vercel.app`)

## Bước 2: Cấu hình Environment Variables (1 phút)

1. Vào **Settings > Environment Variables** trong project Vercel
2. Thêm các biến sau:

```env
# Facebook App
FB_APP_ID=1388459879837006
FB_APP_SECRET=<YOUR_APP_SECRET>

# Facebook Page
FB_PAGE_ID=1198955446627869
FB_PAGE_ACCESS_TOKEN=<YOUR_PAGE_ACCESS_TOKEN>

# Webhook
FB_WEBHOOK_VERIFY_TOKEN=<RANDOM_STRING_YOUR_CHOICE>

# AI Gateway (Gemini 2.5)
AI_GATEWAY_API_KEY=<YOUR_VERCEL_AI_GATEWAY_KEY>
```

3. Nhấn **Save** > **Redeploy** để áp dụng cấu hình

## Bước 3: Lấy Facebook Credentials

### Lấy `FB_APP_SECRET` & `FB_APP_ID`
1. Vào https://developers.facebook.com/apps
2. Chọn app `1388459879837006`
3. **Settings > Basic**
   - Copy `App ID` → `FB_APP_ID`
   - Copy `App Secret` → `FB_APP_SECRET` (nếu cần, nhấn "Show")

### Lấy `FB_PAGE_ACCESS_TOKEN`
1. Trong cùng app, chọn tab **Messenger**
2. Trong **Access Tokens** section:
   - Nhấn "Add" > chọn Page `1198955446627869`
   - Copy token → `FB_PAGE_ACCESS_TOKEN`

### Tạo `FB_WEBHOOK_VERIFY_TOKEN`
```bash
# Dùng terminal để sinh random token
openssl rand -hex 16
# Output: c7a8f3e2b9d4k6l2m9n5o3p8q1r6s2t4
```
Sao chép output vào `FB_WEBHOOK_VERIFY_TOKEN`

### Lấy `AI_GATEWAY_API_KEY`
1. Vào https://vercel.com/~/ai/api-keys
2. Nhấn **Create New Token**
3. Copy token → `AI_GATEWAY_API_KEY`

## Bước 4: Kết nối Facebook Webhook (2 phút)

Sau khi deploy, bạn sẽ có URL: `https://your-app.vercel.app/api/webhook/facebook`

### Đăng ký Webhook trong Facebook
1. Vào https://developers.facebook.com > App Settings > Messenger
2. Trong **Webhooks** section:
   - **Callback URL**: `https://your-app.vercel.app/api/webhook/facebook`
   - **Verify Token**: (nhập `FB_WEBHOOK_VERIFY_TOKEN` bạn tạo ở trên)
   - Nhấn **Verify and Save**

3. Trong **Subscribe to webhook fields**, chọn:
   - ✅ `messages`
   - ✅ `messaging_postbacks`

4. Nhấn **Subscribe to this object** > chọn Page `1198955446627869`

## Bước 5: Test Chatbot (ngay!)

Vào Fanpage `1198955446627869` trên Facebook > **Send Message**
- Gửi: "Xin chào"
- Bot sẽ tự động reply sau 1-2 giây

Kiểm tra logs:
- Vercel Dashboard > **Deployments** > **Functions** > chọn log `/api/webhook/facebook`

## 🔍 Troubleshooting

### Webhook không nhận tin nhắn
```bash
# Test webhook verify
curl -X GET "https://your-app.vercel.app/api/webhook/facebook" \
  -d "hub.mode=subscribe&hub.challenge=test&hub.verify_token=YOUR_VERIFY_TOKEN"

# Nếu trả về "test", webhook đã đúng
```

### Lỗi "AI API error"
- Kiểm tra `AI_GATEWAY_API_KEY` có hợp lệ không: https://vercel.com/~/ai/api-keys
- Kiểm tra Vercel logs xem có error message nào

### Lỗi "Webhook validation failed"
- Đảm bảo `FB_WEBHOOK_VERIFY_TOKEN` khớp với token bạn nhập trên Facebook Developers
- Redeploy lại app sau khi thay đổi env vars

## 📊 Giám sát Chatbot

**Xem analytics trên Vercel:**
- Dashboard > **Deployments** > **Functions** > `/api/webhook/facebook`
- Xem: số requests, response time, error rate

**Xem tin nhắn trong Facebook:**
- Vào Fanpage > **Inbox** để xem chat history

## 🔄 Update Code sau Deploy

```bash
# Sau khi sửa code
git add .
git commit -m "Update chatbot logic"
git push origin main

# Vercel tự động deploy lại (follow logs ở dashboard)
```

## ✅ Checklist Hoàn Tất

- [ ] Deploy thành công trên Vercel
- [ ] Tất cả env vars đã thêm
- [ ] Webhook đã đăng ký trên Facebook
- [ ] Test tin nhắn OK
- [ ] Xem được logs trên Vercel

🎉 **Bạn đã sẵn sàng! Dashboard chạy trên:** `https://your-app.vercel.app`
