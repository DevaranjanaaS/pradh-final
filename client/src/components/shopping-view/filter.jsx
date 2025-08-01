import { Fragment, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { API_BASE_URL } from "../../config";

function ProductFilter({ filters, handleFilter, isMobile }) {
  const [categoryData, setCategoryData] = useState({ categories: [], subcategories: [] });
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/common/categories`)
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
      })
      .catch(() => setCategoryData({ categories: [], subcategories: [] }));
  }, []);

  // Get selected categories
  const selectedCategories = filters?.category || [];

  // Filter subcategories based on selected categories
  const availableSubcategories = categoryData.subcategories.filter(sub => {
    if (selectedCategories.length === 0) return false;
    const parentCategory = categoryData.categories.find(cat => cat.id === sub.categoryId);
    return parentCategory && selectedCategories.includes(parentCategory.name);
  });

  // Custom handler for category selection that clears subcategory filters
  const handleCategoryFilter = (categoryName) => {
    let newFilters = { ...filters };
    if (newFilters.subcategory) {
      delete newFilters.subcategory;
    }
    const currentSection = Object.keys(newFilters).indexOf("category");
    if (currentSection === -1) {
      newFilters = { ...newFilters, category: [categoryName] };
    } else {
      const index = newFilters.category.indexOf(categoryName);
      if (index === -1) {
        newFilters.category.push(categoryName);
      } else {
        newFilters.category.splice(index, 1);
        if (newFilters.category.length === 0 && newFilters.subcategory) {
          delete newFilters.subcategory;
        }
      }
    }
    handleFilter("category", categoryName, newFilters);
  };

  // Extracted filter rendering to avoid duplication
  function renderFilters() {
    return (
      <div>
        <div>
          <h3 className="text-base font-bold">Category</h3>
          <div className="grid gap-2 mt-2">
            {categoryData.categories.map(option => {
              const isChecked = filters?.category && filters.category.includes(option.name);
              return (
                <Label key={option.id} className="flex font-medium items-center gap-2 ">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => handleCategoryFilter(option.name)}
                  />
                  {option.name}
                </Label>
              );
            })}
          </div>
        </div>
        {selectedCategories.length > 0 && availableSubcategories.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-base font-bold">Subcategory</h3>
              <div className="grid gap-2 mt-2">
                {availableSubcategories.map(option => (
                  <Label key={option.id} className="flex font-medium items-center gap-2 ">
                    <Checkbox
                      checked={filters?.subcategory && filters.subcategory.includes(option.name)}
                      onCheckedChange={() => handleFilter("subcategory", option.name)}
                    />
                    {option.name}
                  </Label>
                ))}
              </div>
            </div>
          </>
        )}
        <Separator />
      </div>
    );
  }

  return (
    <div>
      {/* Mobile: filter button and panel */}
      {isMobile && (
        <>
          <button
            className="w-full px-4 py-2 bg-accent text-primary rounded font-bold border border-gray-200 mb-3"
            onClick={() => setFilterPanelOpen(true)}
          >
            Filters
          </button>

          {filterPanelOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-end">
              {/* Mobile filter panel */}
              <div
                className="bg-white w-full rounded-t-lg shadow-lg p-0 max-h-[85vh] overflow-auto animate-slide-in-up"
                style={{
                  animation: "slideup 0.3s cubic-bezier(.18,.89,.32,1.28)"
                }}
              >
                <div className="flex justify-between items-center p-4 border-b font-bold">
                  <span>Filters</span>
                  <button
                    onClick={() => setFilterPanelOpen(false)}
                    className="text-gray-600 px-2 py-1 text-xl"
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-4">
                  {renderFilters()}
                  <button
                    className="w-full mt-4 py-2 bg-primary text-white rounded font-semibold"
                    onClick={() => setFilterPanelOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* Desktop: always show filters */}
      {!isMobile && (
        <div className="bg-background rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-lg font-extrabold">Filters</h2>
          </div>
          <div className="p-4 space-y-4">{renderFilters()}</div>
        </div>
      )}

      {/* Animation keyframes (only needs to be defined once globally in your main CSS file) */}
      <style>{`
        @keyframes slideup {
          from { transform: translateY(100%);}
          to { transform: translateY(0);}
        }
        .animate-slide-in-up {
          animation: slideup 0.3s cubic-bezier(.18,.89,.32,1.28);
        }
      `}</style>
    </div>
  );
}

export default ProductFilter;
 