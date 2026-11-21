"""
AI provayder abstraksiyasi.

Yangi provayder qoʻshish: `AIProvider` dan meros oluvchi klass yozing va
`get_provider()` ichida AI_PROVIDER muhit oʻzgaruvchisi boʻyicha tanlang.
Kalitlar faqat server tomonda (.env) saqlanadi.
"""
from __future__ import annotations

import json
import os
from typing import Optional


class ProviderError(Exception):
    pass


class AIProvider:
    name = "none"

    def available(self) -> bool:
        return False

    def complete_json(self, system: str, user: str, schema: dict) -> dict:
        raise ProviderError("provider_not_configured")


class AnthropicProvider(AIProvider):
    """Anthropic Claude (rasmiy `anthropic` Python SDK orqali)."""

    name = "anthropic"

    def __init__(self, api_key: str, model: str):
        self.api_key = api_key
        self.model = model
        self._client = None

    def available(self) -> bool:
        return bool(self.api_key)

    def _get_client(self):
        if self._client is None:
            import anthropic  # pip install anthropic
            self._client = anthropic.Anthropic(api_key=self.api_key, timeout=60.0, max_retries=2)
        return self._client

    def complete_json(self, system: str, user: str, schema: dict) -> dict:
        import anthropic
        client = self._get_client()
        try:
            response = client.beta.messages.create(
                model=self.model,
                max_tokens=4000,
                betas=["server-side-fallback-2026-07-01"],
                fallbacks="default",
                output_config={"effort": "low", "format": {"type": "json_schema", "schema": schema}},
                system=system,
                messages=[{"role": "user", "content": user}],
            )
        except anthropic.RateLimitError as e:
            raise ProviderError("rate_limited") from e
        except anthropic.APIStatusError as e:
            raise ProviderError(f"api_status_{e.status_code}") from e
        except anthropic.APIConnectionError as e:
            raise ProviderError("connection") from e
        if response.stop_reason == "refusal":
            raise ProviderError("refusal")
        text = "".join(getattr(b, "text", "") for b in response.content if getattr(b, "type", "") == "text")
        try:
            return json.loads(text)
        except json.JSONDecodeError as e:
            raise ProviderError("bad_json") from e


def get_provider() -> AIProvider:
    kind = os.environ.get("AI_PROVIDER", "anthropic").lower()
    if kind == "anthropic":
        return AnthropicProvider(os.environ.get("ANTHROPIC_API_KEY", ""), os.environ.get("AI_MODEL", "claude-opus-5-5"))
    return AIProvider()
