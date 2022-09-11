import React from 'react';

import classes from './StreamingSection.module.css';

const StreamingSection = ({ video, extra }) => {
  const { title } = extra;
  return (
    <section className={classes['streaming-section']}>
      {video && (
        <iframe
          className={classes['streaming-video']}
          src={video.replace(
            'https://youtu.be/',
            'https://www.youtube.com/embed/'
          )}
          title={title || 'empty title'}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      )}
      {!video && <p>You haven't posted any video yet</p>}
    </section>
  );
};

export default StreamingSection;
