# ✅ Deployment Checklist - SocialAI Dashboard

## Phần 1: Chuẩn Bị (15 phút)

- [ ] Lấy `FB_APP_SECRET` từ Facebook Developers
- [ ] Lấy `FB_PAGE_ACCESS_TOKEN` từ Graph API Explorer
- [ ] Tạo `FB_WEBHOOK_VERIFY_TOKEN` (chạy `openssl rand -hex 16`)
- [ ] Lấy `AI_GATEWAY_API_KEY` từ Vercel AI
- [ ] Lưu tất cả vào file notes

**Kiểm tra:** Bạn có 4 giá trị mới + đã có `FB_APP_ID` và `FB_PAGE_ID`?
✅ Có → Tiếp tục
❌ Không → Quay lại Phần 1

---

## Phần 2: Push Code (3 phút)

```bash
cd /path/to/sociala-devv0
git add .
git commit -m "Deploy SocialAI with Chatbot"
git push origin main
```

**Kiểm tra:** Xem GitHub có commit mới không?
✅ Có → Tiếp tục
❌ Không → Check git status

---

## Phần 3: Deploy Trên Vercel (5 phút)

- [ ] Vào https://vercel.com
- [ ] Click "New Project"
- [ ] Chọn repo `danhcan/sociala-devv0`
- [ ] Click "Import"
- [ ] Click "Deploy" (xanh)
- [ ] **Lưu URL**: `https://your-app.vercel.app` (sẽ cần ở Phần 5)

**Kiểm tra:** Deployment status = "Ready" (xanh)?
✅ Có → Tiếp tục
❌ Chưa → Chờ 1-2 phút

---

## Phần 4: Add Environment Variables (5 phút)

- [ ] Vào https://vercel.com → Project Settings
- [ ] Click "Environment Variables" (menu trái)
- [ ] Thêm 6 biến:
  ```
  FB_APP_ID = 1388459879837006
  FB_APP_SECRET = [Từ Phần 1]
  FB_PAGE_ID = 1198955446627869
  FB_PAGE_ACCESS_TOKEN = [Từ Phần 1]
  FB_WEBHOOK_VERIFY_TOKEN = [Từ Phần 1]
  AI_GATEWAY_API_KEY = [Từ Phần 1]
  ```
- [ ] Click "Save"

**Kiểm tra:** Tất cả 6 biến xuất hiện trong danh sách?
✅ Có → Tiếp tục
❌ Không → Check lại điền đủ chưa

---

## Phần 5: Redeploy (2 phút)

- [ ] Vào tab "Deployments"
- [ ] Tìm deployment mới nhất
- [ ] Click "..." → "Redeploy"
- [ ] Chọn "Redeploy"

**Kiểm tra:** Status = "Ready"?
✅ Có → Tiếp tục
❌ Error → Xem logs ở Function tab

---

## Phần 6: Xác Thực Webhook (3 phút)

- [ ] Vào https://developers.facebook.com/apps/1388459879837006/messenger/webhooks
- [ ] Click "Edit Subscription"
- [ ] Điền:
  - Callback URL: `https://your-app.vercel.app/api/webhook/facebook`
  - Verify Token: [Giá trị `FB_WEBHOOK_VERIFY_TOKEN`]
- [ ] Click "Verify & Save"

**Kiểm tra:** Webhook status = "Active" (xanh)?
✅ Có → Tiếp tục
❌ Error → Check URL và Verify Token

---

## Phần 7: Subscribe Events (1 phút)

- [ ] Tại cùng page webhook:
  - ☑️ `messages`
  - ☑️ `messaging_postbacks`
- [ ] Click "Save"

**Kiểm tra:** Events được check?
✅ Có → Tiếp tục
❌ Không → Check lại

---

## Phần 8: Test Chatbot (2 phút)

- [ ] Mở Fanpage: https://facebook.com/1198955446627869
- [ ] Gửi message: "Xin chào"
- [ ] Chờ 1-2 giây

**Kiểm tra:** Bot trả lời tự động?
✅ Có → ✨ SUCCESS! ✨
❌ Không → Xem mục Debug

---

## Debug (Nếu Gặp Vấn Đề)

### Bot không trả lời
1. Vào Vercel → Settings → Functions → Logs
2. Gửi message mới
3. Xem error log
4. Kiểm tra:
   - [ ] URL webhook đúng?
   - [ ] Verify Token khớp?
   - [ ] AI_GATEWAY_API_KEY hợp lệ?

### Webhook xác thực thất bại
1. Kiểm tra URL: `https://your-app.vercel.app/api/webhook/facebook` (không có `/` cuối)
2. Kiểm tra Verify Token khớp với `FB_WEBHOOK_VERIFY_TOKEN`
3. Redeploy lại

### Error 500
1. Check Function logs trên Vercel
2. Đảm bảo tất cả Environment Variables được set
3. Redeploy

---

## Tổng Thời Gian: ~35 phút

| Bước | Thời Gian | Status |
|------|-----------|--------|
| Chuẩn bị | 15 min | ⏳ |
| Push code | 3 min | ⏳ |
| Deploy Vercel | 5 min | ⏳ |
| Add Env vars | 5 min | ⏳ |
| Redeploy | 2 min | ⏳ |
| Webhook setup | 3 min | ⏳ |
| Subscribe | 1 min | ⏳ |
| Test | 2 min | ⏳ |
| **TOTAL** | **35 min** | |

---

## Support

Nếu bị stuck ở bước nào, hãy cho tôi biết:
1. Bước nào?
2. Lỗi gì? (copy-paste toàn bộ error)
3. Screenshot nếu có thể

Tôi sẽ giúp bạn fix ngay!
