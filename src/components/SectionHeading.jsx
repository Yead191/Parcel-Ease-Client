import React from 'react';

const SectionHeading = ({ heading, subHeading }) => {
    return (
        <div className='my-20 lg:my-8 text-center w-6/12 lg:w-4/12 mx-auto border-b-4  border-dashed'>
            <h1 style={{ fontVariant: 'small-caps' }} className='text-3xl lg:text-4xl pb-2  font-semibold'>{heading}</h1>

        </div>
    );
};

export default SectionHeading;