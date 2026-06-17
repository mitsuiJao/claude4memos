## memos-claude
memosに特定のタグを含むmemoを投稿すると、claudeがそのmemosに適切な応答をcommentします

## setup
.envをコピー
`$ cp .env.example .env`

- CLAUDDE_CODE: https://platform.claude.com/dashboard からクレジットを購入し、キーを取得してください
- MEMOS_HOST: memosを動かしてるURL
- MEMOS_TOKEN: 返答するアカウントのAPI、BOT用のアカウント作成がおすすめ

dockerイメージを取得
`$ docker pull ghcr.io/mitsuijao/memos2claude:latest`

起動
```bash
  docker run -d \
    --name memos-claude \
    --env-file .env \
    -p 3000:3000 \
    -v $(pwd)/data:/app/data \
    ghcr.io/mitsuijao/memos-claude:latest
```

