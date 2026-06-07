import { Component, signal } from '@angular/core';
import { applyEach, FormField, form, required, Schema, schema, validate } from '@angular/forms/signals';

@Component({
  selector: 'signal-form-array',
  imports: [FormField],
  templateUrl: './signal-form-array.component.html',
  styleUrl: './signal-form-array.component.scss'
})
export class SignalFormArrayComponent {

  profileSkeleton = signal<Profile>({
    firstName: '',
    lastName: '',
    socialLinks: [''],
  })

  profileForm = form(this.profileSkeleton, (path) => {
    required(path.firstName, { message: 'This is a required field' })
    required(path.lastName, { message: 'This is a required field' })
    applyEach(path.socialLinks, socialLinksValidatorSchema)
  });

  submitForm(event: Event) {
    event.preventDefault();

    console.log(this.profileForm());
    console.log(this.profileForm);
    console.log(this.profileForm().value());
  }

  addLink() {
    this.profileSkeleton.update((prevSkeleton) => ({
      ...prevSkeleton,
      socialLinks: [...prevSkeleton.socialLinks, '']
    }))
  }

  removeSocialLink(index: number) {
    this.profileSkeleton.update((prevSkeleton) => ({
      ...prevSkeleton,
      socialLinks: prevSkeleton.socialLinks.filter((_, i) => i != index)
    }))
  }

}

export const socialLinksValidatorSchema: Schema<string> = schema((socialLinkControl) => {
  required(socialLinkControl, { message: 'This is a required field' }),
    validate(socialLinkControl, (ctx) => {
      try {
        new URL(ctx.value())
        return null
      } catch (error) {
        return { kind: 'INVALID_URL', message: 'Not a valid URL.' }
      }
    })
});

interface Profile {
  firstName: string;
  lastName: string;
  socialLinks: string[];
}