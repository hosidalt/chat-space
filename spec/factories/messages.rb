FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/DSC_4330.jpg")
    user
    group
  end
end
