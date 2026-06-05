import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { UserStatusBadgeComponent } from './user-status-badge.component';

describe('UserStatusBadgeComponent', () => {
  let fixture: ComponentFixture<UserStatusBadgeComponent>;

  function createComponent(active: boolean) {
    TestBed.configureTestingModule({ imports: [UserStatusBadgeComponent] });
    fixture = TestBed.createComponent(UserStatusBadgeComponent);
    fixture.componentRef.setInput('active', active);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.status-badge') as HTMLElement;
  }

  it('should render "Active" text, aria-label and active class when active=true', () => {
    const badge = createComponent(true);
    expect(badge.textContent?.trim()).toBe('Active');
    expect(badge.getAttribute('aria-label')).toBe('Active');
    expect(badge.classList).toContain('active');
    expect(badge.classList).not.toContain('inactive');
  });

  it('should render "Inactive" text, aria-label and inactive class when active=false', () => {
    const badge = createComponent(false);
    expect(badge.textContent?.trim()).toBe('Inactive');
    expect(badge.getAttribute('aria-label')).toBe('Inactive');
    expect(badge.classList).toContain('inactive');
    expect(badge.classList).not.toContain('active');
  });
});
