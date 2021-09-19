# TMDB Node

### Clone and prepare kit

```bash
git clone git@github.com:sh4hids/tmdb-node-api.git
```

```bash
cd tmdb-node-api
```

```bash
rm -rf .git
```

```bash
git init
```

Provide necessary values in your `.env`

```bash
cp .env.dev .env
```



### Install dependencies

```bash
npm i
```

### Create db tables

```bash
npm run db:migrate
```

### Add git hook

```bash
npm run prepare
```

### Start dev server

```bash
npm run dev
```

### Build project

```bash
npm run build
```

### Start prod server

```bash
npm start
```

## Sync Data

Run the followin cammand to sync data:

```
npm run sync-data
```

If you want to run daily add `cronSchedule` in cli args

```
npm run sync-data -- --cronSchedule='0 0 * * *'
```
