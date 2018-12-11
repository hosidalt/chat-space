## userテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false
|name|string|null: false
|e-mail|string|null: false, unique: true
|message_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :groups
- has_many :members


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false
|grouo_name|string|null: false
|message_id|references|null: false, foreign_key: true|
|user_id|references|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users
- has_many :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false
|message|text|
|image|string|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

