import axios from 'axios';

async function validateAndCorrectContent(content, schema) {
  function validate(obj, template, path = '') {
    if (Array.isArray(template)) {
      if (!Array.isArray(obj)) {
        return `Error at ${path}: Expected an array`;
      }
      return obj.map((item, index) => validate(item, template[0], `${path}[${index}]`)).filter(result => result !== true);
    } else if (typeof template === 'object') {
      if (typeof obj !== 'object' || obj === null) {
        return `Error at ${path}: Expected an object`;
      }
      return Object.keys(template).map(key => {
        const valueType = template[key];
        const optional = typeof valueType === 'string' && valueType.endsWith('?');
        const expectedType = optional ? valueType.slice(0, -1) : valueType;

        if (!optional && !(key in obj)) {
          return `Missing required key "${key}" at ${path}`;
        }

        if (key in obj) {
          const result = validate(obj[key], expectedType, `${path}.${key}`);
          if (result !== true) {
            return result;
          }
        }

        return true;
      }).filter(result => result !== true);
    } else {
      if (typeof obj !== template) {
        return `Type mismatch at ${path}: Expected ${template}, got ${typeof obj}`;
      }
      return true;
    }
  }

  const errors = validate(content, schema, '');
  if (errors.length === 0) {
    return { valid: true, content };
  } else {
    console.error("Validation errors:", errors);
    const errorSection = errors[0].split(' ')[2].replace('.', '');
    const correctedContent = await axios.post('https://crossintelligence2-50024996332.development.catalystappsail.in/correct-content', {
      error: errors[0],
      [errorSection]: content[errorSection]
    });
    content[errorSection] = correctedContent.data[errorSection];
    return validateAndCorrectContent(content, schema);
  }
}

export default validateAndCorrectContent;