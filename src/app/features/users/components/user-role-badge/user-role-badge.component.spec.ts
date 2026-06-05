import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { UserRoleBadgeComponent } from './user-role-badge.component';

describe('UserRoleBadgeComponent', () => {
  let fixture: ComponentFixture<UserRoleBadgeComponent>;

  function createComponent(role: 'admin' | 'user' | 'guest') {
    TestBed.configureTestingModule({ imports: [UserRoleBadgeComponent] });
    fixture = TestBed.createComponent(UserRoleBadgeComponent);
    fixture.componentRef.setInput('role', role);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.role-badge') as HTMLElement;
  }

  it('should render "admin" label and apply role-admin class', () => {
    const badge = createComponent('admin');
    expect(badge.textContent?.trim()).toBe('admin');
    expect(badge.classList).toContain('role-admin');
  });

  it('should render "user" label and apply role-user class', () => {
    const badge = createComponent('user');
    expect(badge.textContent?.trim()).toBe('user');
    expect(badge.classList).toContain('role-user');
  });

  it('should render "guest" label and apply role-guest class', () => {
    const badge = createComponent('guest');
    expect(badge.textContent?.trim()).toBe('guest');
    expect(badge.classList).toContain('role-guest');
  });

  it('should always include the role-badge base class', () => {
    const badge = createComponent('admin');
    expect(badge.classList).toContain('role-badge');
  });
});
