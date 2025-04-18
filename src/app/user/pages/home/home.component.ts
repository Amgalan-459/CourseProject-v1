import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  speeches: string[] = [
    "Тренировка — это момент, когда ты превосходишь самого себя",
    "Ты сильнее, чем ты думаешь, и способен на большее",
    "Придерживайся своих целей и никогда не сдавайся",
    "Спорт помогает тебе раскрыть свой истинный потенциал",
    "Помни, что каждая тренировка приближает тебя к цели",
    "Тренируйся сегодня, чтобы быть сильнее завтра",
    "Твои мысли становятся действиями, а действия — привычками",
    "Настоящая тренировка начинается, когда ты хочешь остановиться"
  ]
}
