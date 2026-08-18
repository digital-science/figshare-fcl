// Prevent form submission when the user clicks a submit button,
// allowing us to stop a submission event when we do not control the call site.
// This is particularly useful for forms that have multiple buttons with different behaviors,
// but are not configurable or inaccessible in the codebase.
export function preventFormSubmissionThroughButton(submissionEvent) {
  const submitter = submissionEvent?.nativeEvent?.submitter;

  if (submitter?.tagName === "BUTTON" && submitter?.type === "submit") {
    submissionEvent.preventDefault();
  }
}
