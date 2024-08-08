
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
  answerPlay : {key: "a", persianKey: "ش", title: "پلی کردن جواب"}, // done
  answerReverse : {key: "A", persianKey: "َ", title: "برعکس پلی کردن جواب", shift: true}, // done
  scorePlay : {key: "r", persianKey: "ث", title: "  پلی کردن لیست تیم ها"}, // done
  scoreReverse : {key: "R", persianKey: "ٍ", title: "برعکس پلی کردن لیست تیم ها", shift: true}, // done
  timerPlay : {key: "t", persianKey: "ف", title: "  پلی کردن تایمر"}, // done
  pointPlay : {key: "p", persianKey: "ح", title: "  پلی کردن امتیاز"}, // done
  pointReverse : {key: "P", persianKey: "\\", title: "  پلی کردن برعکس امتیاز", shift: true}, // done
}