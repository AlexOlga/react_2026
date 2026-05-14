const urlImg = '/not-found.png';
const altImg = 'not-found';
const NotFound = () => {
  return (
    <div className="flex item-center justify-center" data-testid="not-found">
      <img className="w-4/5 object-cover" src={urlImg} alt={altImg} />
    </div>
  );
};
export default NotFound;
