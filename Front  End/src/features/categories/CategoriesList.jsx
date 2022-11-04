import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import Card from '../../common/components/Card';

/* 
  Renders a list of category cards.
*/

const CategoriesList = ({ categories }) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {categories.map((category) => (
        <Card
          key={category.serviceCategoryId}
          image={category.image}
          title={t(category.serviceCategoryName)}
          subtitle={`${category.serviceCategoryProvidersCount} ${t(
            'Services'
          )}`}
          onClick={() =>
            history.push(`/categories/${category.serviceCategoryId}`)
          }
        />
      ))}
    </motion.div>
  );
};

export default CategoriesList;
