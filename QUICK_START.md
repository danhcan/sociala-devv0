# ⚡ Quick Start — Chỉ 5 Bước

## 1️⃣ Push Code lên GitHub
```bash
git add .
git commit -m "SocialAI Dashboard"
git push origin main
```

## 2️⃣ Deploy trên Vercel
- Vào https://vercel.com/new
- Chọn repo GitHub
- Nhấn **Deploy**
- Copy URL (vd: `https://myapp.vercel.app`)

## 3️⃣ Thêm Environment Variables
Trong Vercel Dashboard > **Settings > Environment Variables**:

| Biến | Giá trị |
|------|--------|
| `FB_APP_ID` | `1388459879837006` |
| `FB_APP_SECRET` | Lấy từ [Developers](https://developers.facebook.com/apps/1388459879837006/settings/basic) |
| `FB_PAGE_ID` | `1198955446627869` |
| `FB_PAGE_ACCESS_TOKEN` | Sinh tại [Graph API Explorer](https://developers.facebook.com/tools/explorer) |
| `FB_WEBHOOK_VERIFY_TOKEN` | `openssl rand -hex 16` |
| `AI_GATEWAY_API_KEY` | Tạo tại [Vercel AI](https://vercel.com/~/ai/api-keys) |

**Redeploy** sau khi thêm xong.

## 4️⃣ Kết nối Webhook Facebook
Vào https://developers.facebook.com/apps/1388459879837006/messenger/webhooks
- **Callback URL**: `https://myapp.vercel.app/api/webhook/facebook`
- **Verify Token**: (nhập `FB_WEBHOOK_VERIFY_TOKEN`)
- Verify > Subscribe fields: `messages` + `messaging_postbacks`
- Subscribe to: Page `1198955446627869`

## 5️⃣ Test
- Fanpage > Send Message: "Xin chào"
- Bot tự reply trong 1-2 giây

✅ **XONG!** Hệ thống chạy live trên Vercel.
