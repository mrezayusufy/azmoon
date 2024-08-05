
type ShortcutType = {
  key: string;
  persianKey: string;
  title: string;
  ctrl?: boolean;
  shift?: boolean;
}

export const SHORTCUTS: Record<string, ShortcutType> = {
  home : {key: "y", persianKey: "غ", title: "خانه", ctrl: true}, // done
  orderId : {key: "i", persianKey: "ه", title: "افزایش نوبت سوال", ctrl: true}, // done
  hostPlay : {key: "h", persianKey: "ا", title: "پلی کردن اسم گوینده", }, // done
  hostReverse : {key: "H", persianKey: "آ", title: "برعکس پلی کردن اسم گوینده", shift: true},
  questionPlay : {key: "q", persianKey: "ض", title: "پلی کردن سوال"}, // done
  questionReverse : {key: "Q", persianKey: "ً", title: "برعکس پلی کردن سوال", shift: true}, // done
  scorePlay : {key: "s", persianKey: "س", title: "  پلی کردن لیست تیم ها"}, // done
  scoreReverse : {key: "S", persianKey: "ُ", title: "برعکس پلی کردن لیست تیم ها", shift: true}, // done
}