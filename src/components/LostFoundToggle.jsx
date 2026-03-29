"use client";
import React, { useState } from 'react';
import ItemsList from '@/components/ItemsList';
import ItemForm from '@/components/ItemForm';

const CATEGORIES = ['Electronics', 'Documents', 'Clothing', 'Accessories', 'Other'];

export default function LostFoundToggle({ type, userId, formTitle, formIcon }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleFormCreated = () => {
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span className="text-xl">{showForm ? '✕' : '➕'}</span>
          {showForm ? 'Cancel' : `Add ${type === 'lost' ? 'Lost' : 'Found'} Item`}
        </button>
      </div>

      {/* Form Section - Collapsible */}
      {showForm && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">{formIcon}</span>
            <h2 className="text-2xl font-bold text-slate-900">{formTitle}</h2>
          </div>
          <ItemForm defaultType={type} onCreated={handleFormCreated} />
        </div>
      )}

      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {selectedCategory ? `${selectedCategory} - ${type === 'lost' ? 'Lost' : 'Found'} Items` : `All ${type === 'lost' ? 'Lost' : 'Found'} Items`}
        </h2>
        <ItemsList type={type} {...(selectedCategory && { category: selectedCategory })} userId={userId} gridLayout={true} />
      </div>
    </div>
  );
}
