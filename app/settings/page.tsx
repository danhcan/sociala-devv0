'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Settings, Key, Webhook, Bot, Copy, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

function EnvRow({ label, envKey, description }: { label: string; envKey: string; description: string }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(envKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <code className="px-2.5 py-1 rounded-lg bg-muted text-primary text-xs font-mono">
          {envKey}
        </code>
        <button
          onClick={copy}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="Copy"
        >
          {copied ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  )
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="px-5">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <DashboardLayout title="Cai dat" subtitle="Cau hinh he thong SocialAI Dashboard">
      <div className="p-6 max-w-3xl space-y-5">
        {/* Environment Variables */}
        <Section icon={Key} title="Bien moi truong (Environment Variables)">
          <EnvRow
            label="Facebook App ID"
            envKey="FB_APP_ID"
            description="ID ung dung Facebook Developer cua ban"
          />
          <EnvRow
            label="Facebook App Secret"
            envKey="FB_APP_SECRET"
            description="Secret cua ung dung Facebook, giu bi mat tuyet doi"
          />
          <EnvRow
            label="Facebook Page Access Token"
            envKey="FB_PAGE_ACCESS_TOKEN"
            description="Token truy cap Fanpage de gui tin nhan va dang bai"
          />
          <EnvRow
            label="Facebook Page ID"
            envKey="FB_PAGE_ID"
            description="ID cua Fanpage ban muon quan ly"
          />
          <EnvRow
            label="Webhook Verify Token"
            envKey="FB_WEBHOOK_VERIFY_TOKEN"
            description="Token xac thuc webhook, tu dat tu do (VD: my-secret-token-123)"
          />
          <EnvRow
            label="OpenAI / DeepSeek API Key"
            envKey="OPENAI_API_KEY"
            description="API Key cua OpenAI hoac DeepSeek de tao cau tra loi tu dong"
          />
          <EnvRow
            label="AI Base URL (tuy chon)"
            envKey="OPENAI_BASE_URL"
            description="De doi sang DeepSeek: https://api.deepseek.com/v1"
          />
          <EnvRow
            label="AI Model (tuy chon)"
            envKey="AI_MODEL"
            description="Mac dinh: gpt-4o-mini. DeepSeek: deepseek-chat"
          />
        </Section>

        {/* Webhook Setup */}
        <Section icon={Webhook} title="Cai dat Facebook Webhook">
          <div className="py-4 space-y-3">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Buoc 1 — Dang ky Webhook URL
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Vao{' '}
                <a
                  href="https://developers.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Facebook Developers
                </a>{' '}
                {'>'} App cua ban {'>'} Messenger {'>'} Webhook Settings. Them Callback URL:
              </p>
              <code className="block px-4 py-2.5 bg-muted rounded-lg text-primary text-xs font-mono break-all">
                https://your-domain.com/api/webhook/facebook
              </code>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Buoc 2 — Verify Token
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Nhap gia tri bien{' '}
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[11px]">
                  FB_WEBHOOK_VERIFY_TOKEN
                </code>{' '}
                vao o &quot;Verify Token&quot; tren Facebook Developers.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Buoc 3 — Subscribe Events
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Chon subscribe cac su kien:{' '}
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[11px]">messages</code>{' '}
                va{' '}
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[11px]">messaging_postbacks</code>
              </p>
            </div>
          </div>
        </Section>

        {/* AI Config */}
        <Section icon={Bot} title="Cau hinh AI (OpenAI / DeepSeek)">
          <div className="py-4 space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Su dung OpenAI (mac dinh)
              </p>
              <pre className="text-xs text-foreground font-mono whitespace-pre-wrap">{`OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4o-mini`}</pre>
            </div>
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Su dung DeepSeek (tiet kiem hon)
              </p>
              <pre className="text-xs text-foreground font-mono whitespace-pre-wrap">{`OPENAI_API_KEY=sk-...  # DeepSeek API Key
OPENAI_BASE_URL=https://api.deepseek.com/v1
AI_MODEL=deepseek-chat`}</pre>
            </div>
          </div>
        </Section>

        {/* System prompt note */}
        <Section icon={Settings} title="System Prompt AI">
          <div className="py-4">
            <p className="text-sm text-foreground/80 leading-relaxed mb-3">
              System prompt mac dinh duoc cau hinh trong{' '}
              <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[11px]">lib/ai.ts</code>.
              Ban co the chinh sua noi dung nay de phu hop voi thuong hieu va phong cach cham soc khach hang cua ban.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs text-muted-foreground font-mono leading-relaxed italic">
                {'"Ban la tro ly cham soc khach hang than thien va chuyen nghiep. Hay tra loi ngan gon, ro rang va huu ich bang tieng Viet..."'}
              </p>
            </div>
          </div>
        </Section>
      </div>
    </DashboardLayout>
  )
}
