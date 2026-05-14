import { NotFoundPage } from '../shared/text';

const NotFound = () => {
  return (
    <div className="flex item-center justify-center" data-testid="not-found">
      <p>
        {NotFoundPage.text}
        <a href="/">{NotFoundPage.link}</a>
      </p>
    </div>
  );
};
export default NotFound;
