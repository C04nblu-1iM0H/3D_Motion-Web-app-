import { Spinner } from '@nextui-org/react';

const SpinnerWithBackdrop = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner color="primary" />
        </div>
      )}
    </>
  );
};

export default SpinnerWithBackdrop;