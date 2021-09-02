import { Button, Icon } from "semantic-ui-react";

const Pagination = ({ page, setPage, pageCount }) => {
  console.log(pageCount, "<< pageCount");
  return (
    <div className="page__container">
      <Button
        icon
        compact={true}
        style={{ width: 50 }}
        disabled={page === 1}
        onClick={() => {
          setPage((currPage) => currPage - 1);
        }}
      >
        <Icon name="chevron left" />
      </Button>
      <p className="page__page-text">Page {page}</p>
      <Button
        icon
        compact={true}
        style={{ width: 50 }}
        disabled={page === pageCount}
        onClick={() => {
          setPage((currPage) => currPage + 1);
        }}
      >
        <Icon name="chevron right" />
      </Button>
    </div>
  );
};

export default Pagination;
