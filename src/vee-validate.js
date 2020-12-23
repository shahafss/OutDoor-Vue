import { extend } from "vee-validate";
// import { required } from "vee-validate/dist/rules";

// extend("required", {
//   ...required,
//   message: "{_field_} is required",
// });

extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1,
    };
  },
  computesRequired: true,
  message: "{_field_} is required",
});

extend("minLength", {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ["length"],
  message: "{_field_} length must be at least {length} characters",
});

extend("maxLength", {
  validate(value, args) {
    return value.length <= args.length;
  },
  params: ["length"],
  message: "{_field_} length should not be more than {length} characters",
});
