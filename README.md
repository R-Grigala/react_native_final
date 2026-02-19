# react_native_final

React Native (Expo) მობილური აპლიკაცია — პროდუქტების კატალოგი, კალათა, ავტორიზაცია და პროფილი.

## ტექნოლოგიური სტეკი

| კატეგორია | ტექნოლოგია |
|-----------|-------------|
| ფრეიმვორკი | React Native, Expo SDK 54 |
| ნავიგაცია | expo-router (file-based routing) |
| ვალიდაცია | react-hook-form, yup |
| შენახვა | AsyncStorage |
| UI | expo-image, @expo/vector-icons |

## პროექტის სტრუქტურა

```
react_native_final/
├── app/
│   ├── _layout.tsx          # Root layout, auth check, CartCountContext
│   ├── (auth)/              # ავტორიზაცია (არავტორიზებული)
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # შესვლა
│   │   └── register.tsx     # რეგისტრაცია
│   └── (tabs)/              # მთავარი აპი (ავტორიზებული)
│       ├── _layout.tsx      # Tab layout
│       ├── index.tsx        # პროდუქტების სია
│       ├── cart.tsx         # კალათა
│       ├── profile.tsx      # პროფილი (ავატარი, გასვლა)
│       └── products/[id]/   # პროდუქტის დეტალი
├── components/
│   ├── appButton/
│   ├── appInput/
│   ├── appTitle/
│   └── cartItem/
├── assets/images/
├── app.json
├── package.json
└── tsconfig.json
```

## ფუნქციონალი

- **ავტორიზაცია** — შესვლა (Fake Store API), რეგისტრაცია (ლოკალური)
- **პროდუქტები** — სია fakestoreapi.com-დან, დეტალი, კალათაში დამატება
- **კალათა** — ნივთის რაოდენობის შეცვლა, წაშლა, ჯამური ფასი, ყიდვის ღილაკი
- **პროფილი** — მომხმარებლის სახელი, ავატარის ატვირთვა (გალერეა/კამერა), გასვლა

## მონაცემების წყაროები

- პროდუქტები: `https://fakestoreapi.com/products`
- ავტორიზაცია: `https://fakestoreapi.com/auth/login`
- AsyncStorage: `user`, `cart`, `registeredUser`, `profile_avatar_uri`

## სადაწყება

### მოთხოვნები

- Node.js (Expo 54-თან თავსებადი)
- npm ან yarn

### დაყენება

```bash
npm install
```

### გაშვება

```bash
npm start
```

ან:

```bash
npx expo start
```

შემდეგ გახსენით:

- iOS სიმულატორი: `i`
- Android ემულატორი: `a`
- ან Expo Go თქვენს მოწყობილობაზე (QR კოდი)

### სხვა სკრიპტები

| სკრიპტი | ბრძანება | აღწერა |
|---------|----------|--------|
| android | `expo start --android` | Android-ზე გაშვება |
| ios     | `expo start --ios`     | iOS-ზე გაშვება |
| web     | `expo start --web`     | Web-ზე გაშვება |
| lint    | `expo lint`            | ESLint შემოწმება |

## კონფიგურაცია

- **app.json** — Expo კონფიგურაცია, iOS/Android permission-ები (კამერა, ფოტოები)
- **tsconfig.json** — path alias: `@/*` → `./*`
- **eslint.config.js** — ESLint + expo კონფიგურაცია

## ლიცენზია

პროფესიული/პრივატური პროექტი (private).
