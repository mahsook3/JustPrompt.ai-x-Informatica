const mapSectionNameToSearchTerm = (sectionName) => {
    switch (sectionName) {
      case "heroSection":
        return "hero";
      case "aboutSection":
        return "about";
      case "statsSection":
        return "stats";
      default:
        return sectionName;
    }
  };

  export default mapSectionNameToSearchTerm;