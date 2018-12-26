class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  has_many :messages
  validates :name, presence: true
end
