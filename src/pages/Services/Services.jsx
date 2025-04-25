import React from 'react';

const services = [
  {
    title: 'Game Development',
    description:
      'We offer top-notch game development services to create engaging and fun games for various platforms.',
    icon: '🎮',
  },
  {
    title: 'Game Design',
    description:
      'Our team provides creative game design services to ensure your game looks great and is enjoyable to play.',
    icon: '🎨',
  },
  {
    title: 'Game Testing',
    description:
      'We provide thorough game testing services to identify and fix bugs, ensuring a smooth gaming experience.',
    icon: '🧪',
  },
  {
    title: 'Game Marketing',
    description:
      'Our game marketing services help you reach a larger audience and make your game a success.',
    icon: '📈',
  },
];

const Services = () => {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg shadow-lg"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
