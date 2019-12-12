<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\SoftwareType
 *
 * @property int $id
 * @property string|null $typename
 * @property int|null $category
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\SoftwareType[] $dependencies
 * @property-read int|null $dependencies_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Software[] $software
 * @property-read int|null $software_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\SoftwareType onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType whereTypename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\SoftwareType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\SoftwareType withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\SoftwareType withoutTrashed()
 */
	class SoftwareType extends \Eloquent {}
}

namespace App{
/**
 * App\Room
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $subsidiary_id
 * @property string|null $number
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Computer[] $computers
 * @property-read int|null $computers_count
 * @property-read \App\Subsidiary|null $subsidiary
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Room onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room whereSubsidiaryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Room whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Room withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Room withoutTrashed()
 */
	class Room extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string|null $name
 * @property string|null $surname
 * @property string|null $patronymic
 * @property int|null $role
 * @property int|null $gender
 * @property string|null $passport_serial
 * @property string|null $address
 * @property int|null $superior_id
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int|null $subsidiary_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read int|null $clients_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Subsidiary|null $subsidiary
 * @property-read \App\User|null $superior
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @property-read int|null $tokens_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassportSerial($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePatronymic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSubsidiaryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSuperiorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSurname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUsername($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\User withoutTrashed()
 */
	class User extends \Eloquent {}
}

namespace App{
/**
 * App\License
 *
 * @property int $id
 * @property float|null $cost
 * @property string|null $expiration_date
 * @property string|null $eula
 * @property int|null $max_apply_count
 * @property string|null $purchase_date
 * @property int|null $software_id
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Software[] $software
 * @property-read int|null $software_count
 * @property-read \App\SoftwareType $softwareType
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\License onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereEula($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereExpirationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereMaxApplyCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereSoftwareId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\License whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\License withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\License withoutTrashed()
 */
	class License extends \Eloquent {}
}

namespace App{
/**
 * App\Subsidiary
 *
 * @property int $id
 * @property int|null $director_id
 * @property string|null $name
 * @property string|null $address
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Computer[] $computers
 * @property-read int|null $computers_count
 * @property-read \App\User|null $director
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $employees
 * @property-read int|null $employees_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Room[] $rooms
 * @property-read int|null $rooms_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Subsidiary onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary whereDirectorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Subsidiary whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Subsidiary withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Subsidiary withoutTrashed()
 */
	class Subsidiary extends \Eloquent {}
}

namespace App{
/**
 * App\Computer
 *
 * @property int $id
 * @property int|null $type
 * @property int|null $room_id
 * @property int|null $responsible_id
 * @property string|null $name
 * @property string|null $inventory_id
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\User|null $responsible
 * @property-read \App\Room|null $room
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @property-read int|null $users_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Computer onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereInventoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereResponsibleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Computer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Computer withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Computer withoutTrashed()
 */
	class Computer extends \Eloquent {}
}

namespace App{
/**
 * App\PartType
 *
 * @property int $id
 * @property int|null $category
 * @property string|null $model
 * @property float|null $cost
 * @property string|null $characteristics
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Part[] $parts
 * @property-read int|null $parts_count
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\PartType onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereCharacteristics($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PartType whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\PartType withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\PartType withoutTrashed()
 */
	class PartType extends \Eloquent {}
}

namespace App{
/**
 * App\Part
 *
 * @property int $id
 * @property int|null $part_type_id
 * @property int|null $subsidiary_id
 * @property int|null $computer_id
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Computer|null $computer
 * @property-read \App\PartType|null $partType
 * @property-read \App\Subsidiary|null $subsidiary
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Part onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part whereComputerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part wherePartTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part whereSubsidiaryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Part whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Part withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Part withoutTrashed()
 */
	class Part extends \Eloquent {}
}

namespace App{
/**
 * App\Software
 *
 * @property int $id
 * @property int|null $software_type_id
 * @property int|null $computer_id
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Computer|null $computer
 * @property-read \App\SoftwareType|null $softwareType
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Software onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software whereComputerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software whereSoftwareTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Software whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Software withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Software withoutTrashed()
 */
	class Software extends \Eloquent {}
}

