import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], // подключение компонентов, которые будут использоваться в html
  templateUrl: './app.html', //подключение шаблона html
  styleUrl: './app.scss', //подключение стилей
})
export class App {
  protected title = 'tik-talk';
}
