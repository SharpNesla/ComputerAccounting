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

            $table->decimal('cost');
            $table->timestamp('expiration-date');
            $table->text('eula')->nullable();
            $table->integer('max-apply-count');
            $table->time('purchase-date');

            $table->bigInteger('software_id')->unsigned()->nullable();
            $table->foreign('software_id')
                ->references('id')->on('software')->onDelete('cascade');

            $table->text('comment')->nullable();
            $table->timestamps();
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
