
type ShortcutType = {
  key: string;
  persianKey: string;
  title: string;
  ctrl: boolean;
}
export const SHORTCUTS: Record<string, ShortcutType> = {
  home : {key: "y", persianKey: "غ", title: "خانه", ctrl: true},
  increment : {key: "i", persianKey: "ه", title: "افزایش نوبت سوال", ctrl: true},
  host : {key: "h", persianKey: "ا", title: "صفحه گوینده", ctrl: false},
  question : {key: "q", persianKey: "ض", title: "نمایش سوال", ctrl: false},
}