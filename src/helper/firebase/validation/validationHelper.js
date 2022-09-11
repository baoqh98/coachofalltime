const validationHelper = (values) => {
  let errors = {};

  const youtubeURLRegEx = new RegExp(
    '^(https?://)?((www.)?youtube.com|youtu.be)/.+$'
  );
  if (!youtubeURLRegEx.test(values.video) && values.video !== '') {
    errors.video = 'Youtube URL is invalid';
    // console.log('Youtube URL is invalid');
  }

  if (!values.title.trim()) {
    errors.title = 'Title is required';
  }

  return errors;
};

export default validationHelper;
