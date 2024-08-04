
type ShortcutType = {
  key: string;
  persianKey: string;
  title: string;
  ctrl?: boolean;
  shift?: boolean;
}

export const SHORTCUTS: Record<string, ShortcutType> = {
  home : {key: "y", persianKey: "غ", title: "خانه", ctrl: true},
  orderId : {key: "i", persianKey: "ه", title: "افزایش نوبت سوال", ctrl: true},
  hostPlay : {key: "h", persianKey: "ا", title: "پلی کردن اسم گوینده", },
  hostReverse : {key: "H", persianKey: "آ", title: "برعکس پلی کردن اسم گوینده", shift: true},
  questionPlay : {key: "q", persianKey: "ض", title: "پلی کردن سوال"},
  questionReverse : {key: "Q", persianKey: "ً", title: "برعکس پلی کردن سوال", shift: true},
}