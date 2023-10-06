import PropTypes from 'prop-types';

const BlogComments = ({ blog }) => {
  if (blog.comments.length === 0) return null;

  return (
    <div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

BlogComments.proptypes = {
  blog: PropTypes.object.isRequired
};

export default BlogComments;
