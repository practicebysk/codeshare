import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private meta: Meta, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('CodeShare - Share Your Code Easily');

    this.meta.addTags([
      { name: 'description', content: 'CodeShare is a platform to easily share, store, and collaborate on code snippets.' },
      { name: 'keywords', content: 'CodeShare, code sharing, online code editor, snippets, collaborate, programming.' },
      { name: 'author', content: 'Code Share' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://codexshare.vercel.app/' },
      { property: 'og:image', content: 'https://codexshare.vercel.app/favicon.ico' },
      { property: 'og:title', content: 'CodeShare - Share Your Code Easily' },
      { property: 'og:description', content: 'CodeShare is a platform to easily share, store, and collaborate on code snippets.' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'CodeShare - Share Your Code Easily' },
      { name: 'twitter:description', content: 'CodeShare is a platform to easily share, store, and collaborate on code snippets.' },
      { name: 'twitter:image', content: 'https://codexshare.vercel.app/favicon.ico' }
    ]);
  }
}
