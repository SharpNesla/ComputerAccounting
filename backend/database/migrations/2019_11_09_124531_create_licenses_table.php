<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLicensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('licenses', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->decimal('cost')->nullable();
            $table->timestamp('expiration_date')->nullable();
            $table->text('eula')->nullable();
            $table->boolean('is_ends_on_date')->nullable();
            $table->integer('max_apply_count')->nullable();
            $table->time('purchase_date')->nullable();

            $table->bigInteger('software_type_id')->unsigned()->nullable();
            $table->foreign('software_type_id')
                ->references('id')->on('software_types')->onDelete('cascade');

            $table->text('comment')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('licenses');
    }
}