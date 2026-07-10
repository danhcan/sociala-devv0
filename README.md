# SocialAI Dashboard

He thong quan ly Fanpage Facebook tu dong — tich hop Chatbot AI cham soc khach hang va lich dang bai len Fanpage. Xay dung bang Next.js 16 (App Router), Tailwind CSS v4, va TypeScript.

---

## Muc luc

1. [Tinh nang chinh](#tinh-nang-chinh)
2. [Cau truc thu muc](#cau-truc-thu-muc)
3. [Yeu cau he thong](#yeu-cau-he-thong)
4. [Cai dat & Chay local](#cai-dat--chay-local)
5. [Cai dat bang Docker](#cai-dat-bang-docker)
6. [Cau hinh bien moi truong](#cau-hinh-bien-moi-truong)
7. [Ket noi Facebook Webhook](#ket-noi-facebook-webhook)
8. [Cau hinh AI Provider (Gemini / DeepSeek / OpenAI)](#cau-hinh-ai-provider)
9. [API Reference](#api-reference)
10. [Troubleshooting](#troubleshooting)

---

## Tinh nang chinh

| Module | Chuc nang |
|--------|-----------|
| **Dashboard** | Tong quan thong ke: tin nhan, bai dang, bot tra loi, fanpage ket noi |
| **Chatbot AI (CSKH)** | Nhan tin nhan tu Facebook Messenger, goi AI (OpenAI / DeepSeek) tra loi tu dong |
| **Lich dang bai** | Soạn thảo, xem lich, dang bai len Fanpage qua Graph API |
| **Cai dat** | Huong dan cau hinh bien moi truong ngay trong giao dien |

---

## Cau truc thu muc

```
socialai-dashboard/
├── app/
│   ├── api/
│   │   ├── webhook/facebook/route.ts   # Nhan tin nhan tu Facebook
│   │   └── posts/route.ts              # Dang bai len Fanpage
│   ├── chatbot/page.tsx                # Trang Chatbot CSKH
│   ├── scheduler/page.tsx              # Trang Lich dang bai
│   ├── settings/page.tsx               # Trang Cai dat
│   ├── layout.tsx
│   ├── page.tsx                        # Trang Dashboard chinh
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx                 # Thanh menu trai
│   │   ├── Header.tsx                  # Thanh header tren
│   │   └── DashboardLayout.tsx         # Wrapper layout chinh
│   ├── chatbot/
│   │   ├── ConversationList.tsx        # Danh sach cuoc hoi thoai
│   │   └── MessageView.tsx             # Xem chi tiet tin nhan
│   ├── scheduler/
│   │   ├── PostCalendar.tsx            # Lich thang xem bai da dang
│   │   ├── PostForm.tsx                # Form soan thao bai viet
│   │   └── PostList.tsx                # Danh sach bai viet
│   └── dashboard/
│       └── StatsCard.tsx               # The thong ke
├── lib/
│   ├── facebook.ts                     # Goi Facebook Graph API
│   ├── ai.ts                           # Goi OpenAI / DeepSeek API
│   └── utils.ts
├── types/
│   └── index.ts                        # TypeScript types
├── .env.example                        # Mau bien moi truong
├── Dockerfile                          # Build image Docker
├── docker-compose.yml                  # Chay bang Docker Compose
└── README.md
```

---

## Yeu cau he thong

### Chay local (khong Docker)

| Cong cu | Phien ban toi thieu |
|---------|---------------------|
| Node.js | 18.x tro len |
| pnpm | 8.x tro len |
| Git | bat ky |

> Cai pnpm neu chua co: `npm install -g pnpm`

### Chay bang Docker

| Cong cu | Phien ban toi thieu |
|---------|---------------------|
| Docker | 24.x tro len |
| Docker Compose | v2.x tro len (da tich hop trong Docker Desktop) |

---

## Cai dat & Chay local

### Buoc 1 — Tai source code

```bash
git clone https://github.com/your-org/socialai-dashboard.git
cd socialai-dashboard
```

### Buoc 2 — Cai dat dependencies

```bash
pnpm install
```

### Buoc 3 — Tao file bien moi truong

```bash
cp .env.example .env.local
```

Mo file `.env.local` va dien cac gia tri thuc cua ban (xem phan [Cau hinh bien moi truong](#cau-hinh-bien-moi-truong) ben duoi).

### Buoc 4 — Chay dev server

```bash
pnpm dev
```

Truy cap: `http://localhost:3000`

### Buoc 5 (tuy chon) — Build production

```bash
pnpm build
pnpm start
```

---

## Cai dat bang Docker

### Phuong phap 1: Docker Compose (khuyen nghi)

```bash
# 1. Tao file bien moi truong
cp .env.example .env.local
# Sua .env.local voi gia tri that

# 2. Build va chay
docker compose up --build -d

# 3. Kiem tra logs
docker compose logs -f

# 4. Truy cap ung dung
# http://localhost:3000

# 5. Dung ung dung
docker compose down
```

### Phuong phap 2: Docker truc tiep

```bash
# Build image
DOCKER_BUILD=true docker build -t socialai-dashboard .

# Chay container
docker run -d \
  --name socialai-dashboard \
  -p 3000:3000 \
  --env-file .env.local \
  --restart unless-stopped \
  socialai-dashboard

# Xem logs
docker logs -f socialai-dashboard

# Dung container
docker stop socialai-dashboard
docker rm socialai-dashboard
```

### Cap nhat phien ban moi

```bash
git pull
docker compose down
docker compose up --build -d
```

---

## Cau hinh bien moi truong

Sao chep `.env.example` thanh `.env.local` va dien day du cac gia tri:

```env
# ===== Facebook App =====
# Lay tai: https://developers.facebook.com > App > Settings > Basic
FB_APP_ID=1388459879837006
FB_APP_SECRET=your_app_secret_here

# ===== Facebook Page =====
# Lay Page Access Token tai: Graph API Explorer > chon Page > generate token
FB_PAGE_ACCESS_TOKEN=your_page_access_token_here
FB_PAGE_ID=1198955446627869

# ===== Facebook Webhook =====
# Dat chuoi bat ky, dung khi dang ky webhook
FB_WEBHOOK_VERIFY_TOKEN=your_random_verify_token_here

# ===== Vercel AI Gateway (Gemini 2.5 Pro) =====
# Lay key tai: https://vercel.com/~/ai/api-keys
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

### Cach lay Page Access Token

1. Vao [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Chon App cua ban
3. Chon **User or Page** > chon Page muon quan ly
4. Click **Generate Access Token**
5. Chon quyen: `pages_messaging`, `pages_read_engagement`, `pages_manage_posts`
6. Copy token dan vao `FB_PAGE_ACCESS_TOKEN`

> **Luu y:** Token mac dinh chi ton tai 1 gio. De su dung lau dai, can doi sang Long-lived Page Access Token qua API hoac Facebook Business Manager.

---

## Ket noi Facebook Webhook

Webhook la cach Facebook gui tin nhan cua khach hang ve he thong cua ban de AI xu ly.

### Yeu cau

He thong phai co URL HTTPS cong khai. Neu chay local, dung [ngrok](https://ngrok.com):

```bash
# Cai ngrok
npm install -g ngrok

# Tao tunnel
ngrok http 3000
# => Lay URL dang: https://abc123.ngrok-free.app
```

### Cac buoc dang ky Webhook

1. Vao [Facebook Developers](https://developers.facebook.com) > chon App cua ban
2. Menu trai: **Messenger > Settings**
3. Phan **Webhooks**, click **Add Callback URL**
4. Dien:
   - **Callback URL:** `https://your-domain.com/api/webhook/facebook`
   - **Verify Token:** gia tri `FB_WEBHOOK_VERIFY_TOKEN` trong `.env.local`
5. Click **Verify and Save**
6. Sau khi xac thuc thanh cong, click **Add Subscriptions**
7. Chon: `messages`, `messaging_postbacks`, `messaging_optins`
8. Lien ket Webhook voi Page Fanpage cua ban

### Kiem tra Webhook

```bash
# Kiem tra GET verification
curl "https://your-domain.com/api/webhook/facebook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=test123"
# Ket qua mong doi: test123

# Kiem tra POST nhan tin nhan (thu nghiem)
curl -X POST https://your-domain.com/api/webhook/facebook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "page",
    "entry": [{
      "messaging": [{
        "sender": {"id": "1234567890"},
        "message": {"text": "Xin chao, toi muon hoi ve san pham"}
      }]
    }]
  }'
```

---

## Cau hinh AI Provider

He thong su dung **Vercel AI Gateway** voi mo hinh mac dinh la `google/gemini-2.5-pro`. Chi can mot bien duy nhat:

```env
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

Lay key tai: [vercel.com/~/ai/api-keys](https://vercel.com/~/ai/api-keys)

### So sanh cac mo hinh co the dung

| Model | Chi phi (approx.) | Khuyen dung cho |
|-------|-------------------|-----------------|
| `google/gemini-2.5-pro` | ~$1.25/1M tokens | **Mac dinh** — chat luong cao, hieu tieng Viet tot |
| `google/gemini-2.5-flash` | ~$0.075/1M tokens | Nhanh hon, re hon, phu hop CSKH |
| `anthropic/claude-sonnet-4-5` | ~$3/1M tokens | Kha nang suy luan phuc tap |
| `openai/gpt-4o-mini` | ~$0.15/1M tokens | Lua chon OpenAI tiet kiem |

De doi mo hinh, sua dong `model:` trong `lib/ai.ts`:

```ts
// Doi sang Gemini Flash (nhanh va re hon)
model: 'google/gemini-2.5-flash',
```

---

## API Reference

### `GET /api/webhook/facebook`

Xac thuc webhook voi Facebook (tu dong goi boi Facebook).

| Query param | Mo ta |
|-------------|-------|
| `hub.mode` | Phai la `subscribe` |
| `hub.verify_token` | Phai khop voi `FB_WEBHOOK_VERIFY_TOKEN` |
| `hub.challenge` | Tra ve gia tri nay neu xac thuc thanh cong |

---

### `POST /api/webhook/facebook`

Nhan tin nhan tu Facebook Messenger. He thong se:
1. Doc noi dung tin nhan
2. Goi AI lay cau tra loi
3. Gui cau tra loi lai cho nguoi dung qua Facebook API

Body: dinh dang chuan cua Facebook Messenger Webhook.

---

### `POST /api/posts`

Dang bai len Fanpage.

```json
{
  "message": "Noi dung bai viet...",
  "imageUrl": "https://example.com/image.jpg",
  "pageId": "123456789",
  "pageAccessToken": "EAABsb..."
}
```

**Response thanh cong:**
```json
{
  "success": true,
  "postId": "123456789_987654321"
}
```

**Response that bai:**
```json
{
  "success": false,
  "error": "Mo ta loi..."
}
```

---

## Troubleshooting

### Loi: "FB_PAGE_ACCESS_TOKEN not configured"

Dam bao file `.env.local` co bien `FB_PAGE_ACCESS_TOKEN` va gia tri khong rong. Khi chay Docker, kiem tra env_file trong `docker-compose.yml` tro dung vao file `.env.local`.

---

### Loi: "Webhook verification failed"

Kiem tra gia tri `FB_WEBHOOK_VERIFY_TOKEN` trong `.env.local` phai giong het voi gia tri ban nhap vao Facebook Developers Console (phan bien hoa chu thuong).

---

### Loi: "AI API error"

- Kiem tra `AI_GATEWAY_API_KEY` da duoc dat dung trong `.env.local`.
- Vao [vercel.com/~/ai/api-keys](https://vercel.com/~/ai/api-keys) kiem tra key con hieu luc va chua het han.
- Neu dung Vercel local (khong deploy), dam bao key duoc tao dung cho moi truong development.

---

### Docker: Container khoi dong roi dung ngay

```bash
# Xem log de tim nguyen nhan
docker compose logs socialai-dashboard

# Thuong gap: thieu bien moi truong trong .env.local
# Kiem tra lai file .env.local ton tai va co gia tri dung
```

---

### Port 3000 da duoc su dung

Sua port trong `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"   # Doi sang port 3001
```

Hoac kill process dang dung port 3000:

```bash
# Tren Linux / macOS
lsof -ti:3000 | xargs kill -9

# Tren Windows (PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
```

---

## Ghi chu phat trien

- File `.env.local` **khong duoc** commit len Git (da them vao `.gitignore`).
- Khi them tinh nang moi cho AI, sua system prompt trong `lib/ai.ts`.
- De them Fanpage moi, cap nhat `FB_PAGE_ID` va `FB_PAGE_ACCESS_TOKEN` trong `.env.local` roi khoi dong lai ung dung.
