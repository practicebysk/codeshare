import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { Component, signal, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-editor',
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  // --- STATE SIGNALS ---
  code = signal<string>('');
  isLoading = signal<boolean>(false);
  shareableLink = signal<string>('');
  copyButtonText = signal<string>('Copy');
  errorMessage = signal<string>('');
  uniID = signal<string>('');
  private readonly platformId = inject(PLATFORM_ID);
  isDarkMode = signal<boolean>(true);

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.uniID.set(this.route.snapshot.paramMap.get('id') || '');
    if (this.uniID()) { this.loadCode() };
  }

  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
  }

  // --- API METHODS ---
  loadCode(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.api.get<any[]>('code', this.uniID()).subscribe((response: any) => {
      this.isLoading.set(false);
      if (response && response.code) {
        this.code.set(response.code);
        if (typeof window !== 'undefined') {
          const newUrl = `${window.location.origin}/${response.id}`;
          this.shareableLink.set(newUrl);
        }
      }
    });
  }

  saveCode(): void {
    if (this.code().trim() === '') return;
    this.isLoading.set(true);
    this.shareableLink.set('');
    this.errorMessage.set('');

    this.api.post<any[]>(`code`, { code: this.code(), uniId: this.uniID() }).subscribe((response: any) => {
      this.isLoading.set(false);
      if (response && response.id) {
        if (typeof window !== 'undefined') {
          const newUrl = `${window.location.origin}/${response.id}`;
          this.shareableLink.set(newUrl);
        }
        this.router.navigate([response.id]);
      }
    });
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.shareableLink())
  }
}
