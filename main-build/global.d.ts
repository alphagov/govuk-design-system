/**  
 * As govuk-frontend provides no types, TypeScript will type its exports as `any`,
 * but be unable to acknowledge fields inherited from parent classes  
 * leading to errors when trying to assign or use them.  
 * 
 * TypeScript's shorthand ambient modules seem to also make inherited fields typed as `any`.
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#shorthand-ambient-module-declarations
 */
declare module "govuk-frontend";