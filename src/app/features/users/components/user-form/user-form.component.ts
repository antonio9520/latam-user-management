import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CreateUserPayload } from '../../models/user.model';
import { UserRole } from '../../models/user-role.type';

const NO_SPACES_PATTERN = /^\S+$/;

interface UserFormGroup {
  username: FormControl<string>;
  email: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  role: FormControl<UserRole | null>;
  active: FormControl<boolean>;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  /** Pre-populate the form when editing an existing user. */
  readonly initialValue = input<Partial<CreateUserPayload>>({});
  readonly isSaving = input<boolean>(false);

  /** Emits the validated payload; the container handles the API call. */
  readonly submitForm = output<CreateUserPayload>();
  readonly cancelForm = output<void>();

  readonly roleOptions: { value: UserRole; label: string }[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' },
  ];

  readonly form = new FormGroup<UserFormGroup>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(NO_SPACES_PATTERN),
      ],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    role: new FormControl<UserRole | null>(null, {
      validators: [Validators.required],
    }),
    active: new FormControl(true, { nonNullable: true }),
  });

  ngOnInit(): void {
    const initial = this.initialValue();
    if (Object.keys(initial).length > 0) {
      this.form.patchValue(initial);
    }
  }

  getError(controlName: keyof UserFormGroup): string {
    const ctrl = this.form.get(controlName) as AbstractControl;
    if (!ctrl.invalid || !ctrl.touched) return '';

    if (ctrl.hasError('required')) return REQUIRED_MESSAGES[controlName];
    if (ctrl.hasError('minlength')) {
      const min = (ctrl.getError('minlength') as { requiredLength: number }).requiredLength;
      return `At least ${min} characters`;
    }
    if (ctrl.hasError('email')) return 'Enter a valid email address';
    if (ctrl.hasError('pattern')) return 'No spaces allowed';
    return '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { role, ...rest } = this.form.getRawValue();
    this.submitForm.emit({ ...rest, role: role! });
  }

  onCancel(): void {
    this.cancelForm.emit();
  }
}

const REQUIRED_MESSAGES: Record<keyof UserFormGroup, string> = {
  username: 'Username is required',
  email: 'Email is required',
  firstName: 'First name is required',
  lastName: 'Last name is required',
  role: 'Role is required',
  active: '',
};
