import React from 'react';

const SectionHeading = ({ heading, subHeading }) => {
    return (
        <div className='mt-16 mb-12 lg:my-8 text-center p-2 w-full md::w-6/12 lg:w-4/12 mx-auto'>
            <h1 style={{ fontVariant: 'small-caps' }} className='text-3xl lg:text-4xl  font-semibold'>{heading}</h1>

        </div>
    );
};

export default SectionHeading;