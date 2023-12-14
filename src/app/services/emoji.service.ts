import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {
  constructor() {}

  public generateRandomFoodEmoji(): string {
    const foodEmojis: string[] = [
      '🍔',
      '🍕',
      '🍟',
      '🍗',
      '🥩',
      '🥓',
      '🍖',
      '🌭',
      '🍿',
      '🍱',
      '🍛',
      '🍜',
      '🍝',
      '🍣',
      '🍤',
      '🍙',
      '🍚',
      '🍘',
      '🥮',
      '🥟',
      '🍢',
      '🍡',
      '🍧',
      '🍨',
      '🍦',
      '🥧',
      '🧁',
      '🍰',
      '🎂',
      '🍮',
      '🍭',
      '🍬',
      '🍫',
      '🍩',
      '🥥',
      '🥝',
      '🍇',
      '🍉',
      '🍊',
      '🍋',
      '🍌',
      '🍍',
      '🍎',
      '🍏',
      '🍐',
      '🍑',
      '🍒',
      '🍓',
      '🥭',
      '🍅',
      '🥑',
      '🥦',
      '🥬',
      '🥒',
      '🌶',
      '🌽',
      '🥕',
      '🥔',
      '🍠',
      '🥐',
      '🥯',
      '🍞',
      '🥖',
      '🍳',
      '🥗',
    ];
    const randomIndex: number = Math.floor(Math.random() * foodEmojis.length);
    return foodEmojis[randomIndex];
  }

  public generateRandomHungryEmoji(): string {
    const hungryEmojis: string[] = [
      '🥺',
      '😒',
      '😞',
      '😟',
      '😠',
      '😡',
      '🤬',
      '😔',
      '😕',
      '🙁',
      '🤒',
    ];
    const randomIndex: number = Math.floor(Math.random() * hungryEmojis.length);
    return hungryEmojis[randomIndex];
  }

  public generateRandomHappyEmoji(): string {
    const happyEmojis: string[] = [
      '🥰',
      '😍',
      '😁',
      '😃',
      '😄',
      '😆',
      '😊',
      '😎',
      '🤪',
      '🤩',
      '🥳',
      '😏',
      '😌',
      '😛',
      '😇',
      '🤠',
    ];
    const randomIndex: number = Math.floor(Math.random() * happyEmojis.length);
    return happyEmojis[randomIndex];
  }
}
